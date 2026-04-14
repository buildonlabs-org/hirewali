import { NextRequest, NextResponse } from 'next/server';
import { PRICING_DATA } from '@/lib/pricing';
import { createCheckoutSession } from '@/lib/stripe';
import type { PricingRegion } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { tierId, region } = await request.json();

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in your environment.' },
        { status: 500 }
      );
    }

    // Find the tier in the region's pricing
    const regionData = PRICING_DATA[region as PricingRegion];
    if (!regionData) {
      return NextResponse.json({ error: 'Invalid region' }, { status: 400 });
    }

    const tier = regionData.tiers.find((t) => t.id === tierId);
    if (!tier) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await createCheckoutSession({
      tierId: tier.id,
      tierName: tier.name,
      totalPrice: tier.totalPrice,
      currency: tier.currency,
      applications: tier.applications,
      successUrl: `${origin}/app/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/app/billing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
