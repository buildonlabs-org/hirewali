import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are Wali, an AI job application agent. You help users find and apply to jobs on LinkedIn and Nakuri.

Your capabilities:
1. Search for jobs on LinkedIn and Nakuri based on user preferences
2. Apply to jobs on behalf of the user
3. Track application status
4. Provide job market insights

When a user asks you to apply for jobs or search for jobs, use the available MCP tools to interact with LinkedIn and Nakuri platforms.

Guidelines:
- Be concise and professional
- Always confirm before applying to a batch of jobs
- Report back with clear status updates
- If the user hasn't set up their preferences yet, guide them to the setup page
- Format job listings clearly with company, role, location, and salary when available

When using tools, think step by step:
1. First search for matching jobs using the search tools
2. Present the results to the user for approval
3. Apply to approved jobs one by one
4. Report the results`;

// Define MCP tool schemas for LinkedIn and Nakuri
const TOOLS: Anthropic.Messages.Tool[] = [
  {
    name: 'linkedin_search_jobs',
    description:
      'Search for jobs on LinkedIn based on keywords, location, and filters. Returns a list of matching job postings.',
    input_schema: {
      type: 'object' as const,
      properties: {
        keywords: {
          type: 'string',
          description: 'Job search keywords (e.g., "Software Engineer")',
        },
        location: {
          type: 'string',
          description: 'Job location (e.g., "San Francisco, CA")',
        },
        remote: {
          type: 'boolean',
          description: 'Whether to include remote jobs',
        },
        experience_level: {
          type: 'string',
          enum: ['entry', 'mid', 'senior', 'executive'],
          description: 'Required experience level',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
        },
      },
      required: ['keywords'],
    },
  },
  {
    name: 'linkedin_apply_job',
    description:
      'Apply to a specific job on LinkedIn using the user\'s profile and resume.',
    input_schema: {
      type: 'object' as const,
      properties: {
        job_id: {
          type: 'string',
          description: 'The LinkedIn job posting ID',
        },
        cover_letter: {
          type: 'string',
          description: 'Optional cover letter text tailored to the job',
        },
      },
      required: ['job_id'],
    },
  },
  {
    name: 'linkedin_get_job_details',
    description:
      'Get detailed information about a specific LinkedIn job posting.',
    input_schema: {
      type: 'object' as const,
      properties: {
        job_id: {
          type: 'string',
          description: 'The LinkedIn job posting ID',
        },
      },
      required: ['job_id'],
    },
  },
  {
    name: 'nakuri_search_jobs',
    description:
      'Search for jobs on Nakuri based on keywords, location, and filters. Returns a list of matching job postings.',
    input_schema: {
      type: 'object' as const,
      properties: {
        keywords: {
          type: 'string',
          description: 'Job search keywords',
        },
        location: {
          type: 'string',
          description: 'Job location',
        },
        industry: {
          type: 'string',
          description: 'Industry filter',
        },
        salary_min: {
          type: 'number',
          description: 'Minimum salary',
        },
        salary_max: {
          type: 'number',
          description: 'Maximum salary',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results',
        },
      },
      required: ['keywords'],
    },
  },
  {
    name: 'nakuri_apply_job',
    description:
      'Apply to a specific job on Nakuri using the user\'s profile and resume.',
    input_schema: {
      type: 'object' as const,
      properties: {
        job_id: {
          type: 'string',
          description: 'The Nakuri job posting ID',
        },
        cover_letter: {
          type: 'string',
          description: 'Optional cover letter text',
        },
      },
      required: ['job_id'],
    },
  },
  {
    name: 'nakuri_get_job_details',
    description:
      'Get detailed information about a specific Nakuri job posting.',
    input_schema: {
      type: 'object' as const,
      properties: {
        job_id: {
          type: 'string',
          description: 'The Nakuri job posting ID',
        },
      },
      required: ['job_id'],
    },
  },
];

// MCP tool execution handler — dispatches to real MCP servers when configured,
// otherwise returns a placeholder indicating the MCP server isn't connected.
async function executeTool(
  name: string,
  input: Record<string, unknown>
): Promise<string> {
  // Check if MCP server URLs are configured
  const linkedinMcpUrl = process.env.LINKEDIN_MCP_URL;
  const nakuriMcpUrl = process.env.NAKURI_MCP_URL;

  if (name.startsWith('linkedin_') && linkedinMcpUrl) {
    try {
      const res = await fetch(`${linkedinMcpUrl}/tools/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.LINKEDIN_MCP_TOKEN || ''}`,
        },
        body: JSON.stringify(input),
      });
      return await res.text();
    } catch (error) {
      return JSON.stringify({ error: 'LinkedIn MCP server connection failed', details: String(error) });
    }
  }

  if (name.startsWith('nakuri_') && nakuriMcpUrl) {
    try {
      const res = await fetch(`${nakuriMcpUrl}/tools/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NAKURI_MCP_TOKEN || ''}`,
        },
        body: JSON.stringify(input),
      });
      return await res.text();
    } catch (error) {
      return JSON.stringify({ error: 'Nakuri MCP server connection failed', details: String(error) });
    }
  }

  // Fallback: MCP servers not configured — return demo data
  return JSON.stringify({
    status: 'mcp_not_configured',
    message: `The ${name.startsWith('linkedin_') ? 'LinkedIn' : 'Nakuri'} MCP server is not configured. Set ${name.startsWith('linkedin_') ? 'LINKEDIN_MCP_URL' : 'NAKURI_MCP_URL'} in your environment variables.`,
    demo: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          content:
            'The Anthropic API key is not configured. Please set ANTHROPIC_API_KEY in your environment variables.',
        },
        { status: 200 }
      );
    }

    const client = new Anthropic({ apiKey });

    // Build messages from history
    const messages: Anthropic.Messages.MessageParam[] = [
      ...(history || []).map(
        (m: { role: string; content: string }) =>
          ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })
      ),
      { role: 'user', content: message },
    ];

    // Initial call to Haiku with tools
    let response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      tools: TOOLS,
      messages,
    });

    // Handle tool use in a loop (agentic pattern)
    const allMessages = [...messages];
    let applications: { company: string; role: string; status: string }[] = [];

    while (response.stop_reason === 'tool_use') {
      const assistantContent = response.content;
      allMessages.push({ role: 'assistant', content: assistantContent });

      // Execute all tool calls
      const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];
      for (const block of assistantContent) {
        if (block.type === 'tool_use') {
          const result = await executeTool(
            block.name,
            block.input as Record<string, unknown>
          );
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: result,
          });

          // Track applications
          if (block.name.endsWith('_apply_job')) {
            const input = block.input as Record<string, unknown>;
            applications.push({
              company: (input.company as string) || 'Unknown',
              role: (input.role as string) || 'Unknown',
              status: result.includes('error') ? 'failed' : 'applied',
            });
          }
        }
      }

      allMessages.push({ role: 'user', content: toolResults });

      // Continue the conversation
      response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages: allMessages,
      });
    }

    // Extract text response
    const textContent = response.content
      .filter((block): block is Anthropic.Messages.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n');

    return NextResponse.json({
      content: textContent,
      applications: applications.length > 0 ? applications : undefined,
    });
  } catch (error) {
    console.error('Agent error:', error);
    return NextResponse.json(
      {
        content:
          'Something went wrong while processing your request. Please try again.',
      },
      { status: 200 }
    );
  }
}
