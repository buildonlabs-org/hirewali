import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // Extract subdomain — also support ?mode=app for Railway preview testing
  const modeParam = url.searchParams.get('mode');
  const subdomain = modeParam === 'app' ? 'app' : getSubdomain(hostname);

  // If we're on the app subdomain, rewrite to /app routes
  if (subdomain === 'app') {
    // Already on an /app path, let it through
    if (url.pathname.startsWith('/app')) {
      return NextResponse.next();
    }
    // Rewrite root and other paths to /app
    url.pathname = `/app${url.pathname === '/' ? '/dashboard' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // For www or bare domain, serve the marketing/landing page
  // The default (marketing) route group handles this
  return NextResponse.next();
}

function getSubdomain(hostname: string): string | null {
  // Remove port for local development
  const host = hostname.split(':')[0];

  // Handle localhost for development
  if (host === 'localhost' || host === '127.0.0.1') {
    return null;
  }

  // Handle app.hirewali.com
  const parts = host.split('.');
  if (parts.length >= 3 && parts[0] === 'app') {
    return 'app';
  }

  // www.hirewali.com or hirewali.com -> marketing
  return null;
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
