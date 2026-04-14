import { NextRequest, NextResponse } from 'next/server';
import { detectRegion } from '@/lib/pricing';

export async function GET(request: NextRequest) {
  // Try to detect region from Vercel/Cloudflare headers
  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code');

  const region = detectRegion(country || undefined);

  return NextResponse.json({ region, country });
}
