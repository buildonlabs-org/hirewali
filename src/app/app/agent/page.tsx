'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Briefcase, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  applications?: { company: string; role: string; status: string }[];
}

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hi! I'm Wali, your job application agent. I can search for jobs on LinkedIn and Nakuri, then apply on your behalf.\n\nTo get started, make sure you've set up your job preferences. Then just tell me something like:\n\n• \"Start applying to Senior Engineer roles\"\n• \"Find React developer jobs in New York\"\n• \"Apply to 20 jobs matching my profile\"\n\nWhat would you like me to do?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
        applications: data.applications,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please make sure your API keys are configured and try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Wali Agent</h1>
          <p className="text-neutral-500 text-sm">
            Chat with Wali to search and apply for jobs.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-600 font-medium">Online</span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-neutral-200 p-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                message.role === 'assistant'
                  ? 'bg-black'
                  : 'bg-neutral-100'
              }`}
            >
              {message.role === 'assistant' ? (
                <Bot size={14} className="text-white" />
              ) : (
                <User size={14} className="text-neutral-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium">
                  {message.role === 'assistant' ? 'Wali' : 'You'}
                </span>
                <span className="text-[10px] text-neutral-300">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>

              {/* Application results */}
              {message.applications && message.applications.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.applications.map((app, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-neutral-50 rounded-lg px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Briefcase size={14} className="text-neutral-400" />
                        <div>
                          <p className="text-sm font-medium">{app.role}</p>
                          <p className="text-xs text-neutral-400">{app.company}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          app.status === 'applied'
                            ? 'bg-emerald-50 text-emerald-600'
                            : app.status === 'applying'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Loader2 size={14} className="animate-spin" />
              Wali is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Tell Wali what to do..."
            disabled={isLoading}
            className="flex-1 bg-white border border-neutral-200 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black placeholder:text-neutral-300 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-black text-white px-5 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-30"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-neutral-300 mt-2 text-center">
          Wali uses LinkedIn and Nakuri APIs to search and apply for jobs.
        </p>
      </div>
    </div>
  );
}
