# Wali — Your Agent for Hire

Wali is an AI agent that applies for jobs on your behalf across LinkedIn and Nakuri. Set your preferences, upload your resume, and let Wali handle the rest.

## Architecture

```
www.hirewali.com  →  Landing page (marketing, pricing, CTA)
app.hirewali.com  →  Dashboard app (setup, agent chat, billing)
```

Subdomain routing is handled via Next.js middleware.

## Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4, Framer Motion
- **AI Agent**: Anthropic Claude Haiku (`claude-haiku-4-5-20251001`)
- **Payments**: Stripe (dynamic pricing, checkout sessions)
- **Job Platforms**: LinkedIn MCP, Nakuri MCP

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your keys to .env.local:
#   ANTHROPIC_API_KEY=sk-ant-...
#   STRIPE_SECRET_KEY=sk_test_...
#   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Run development server
npm run dev
```

- Landing page: [http://localhost:3000](http://localhost:3000)
- App dashboard: [http://localhost:3000/app/dashboard](http://localhost:3000/app/dashboard)

## MCP Server Configuration

Wali connects to LinkedIn and Nakuri via MCP servers. Configure the server URLs in your environment:

```
LINKEDIN_MCP_URL=http://localhost:8001
LINKEDIN_MCP_TOKEN=your-token
NAKURI_MCP_URL=http://localhost:8002
NAKURI_MCP_TOKEN=your-token
```

The agent gracefully degrades when MCP servers aren't configured.

## Pricing

Regionalized per-application pricing across 10 regions:

| Region | Starter (25 apps) | Pro (100 apps) | Scale (500 apps) |
|--------|-------------------|----------------|------------------|
| US | $3.00/app | $2.00/app | $1.50/app |
| EU | €2.80/app | €1.80/app | €1.30/app |
| UK | £2.40/app | £1.60/app | £1.20/app |
| India | ₹40/app | ₹25/app | ₹18/app |
| SEA | $1.20/app | $0.80/app | $0.60/app |

Region is auto-detected via timezone with manual override.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── api/
│   │   ├── agent/route.ts        # Wali agent (Haiku + MCP tools)
│   │   ├── checkout/route.ts     # Stripe checkout sessions
│   │   └── region/route.ts       # Region auto-detection
│   └── app/
│       ├── layout.tsx            # App sidebar layout
│       ├── dashboard/page.tsx    # Dashboard
│       ├── setup/page.tsx        # 4-step job setup wizard
│       ├── agent/page.tsx        # Wali chat interface
│       └── billing/page.tsx      # Credits & Stripe checkout
├── components/
│   └── landing/                  # Landing page components
├── lib/
│   ├── pricing.ts                # Regional pricing data
│   ├── services.ts               # Wali service definitions
│   └── stripe.ts                 # Stripe server utilities
├── types/
│   └── index.ts                  # TypeScript types
└── middleware.ts                 # Subdomain routing
```
