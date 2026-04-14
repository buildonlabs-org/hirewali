import Stripe from 'stripe';

// Server-side Stripe instance
export function getStripeServer(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key, {
    apiVersion: '2026-03-25.dahlia',
  });
}

// Create a checkout session with dynamic pricing
export async function createCheckoutSession({
  tierId,
  tierName,
  totalPrice,
  currency,
  applications,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  tierId: string;
  tierName: string;
  totalPrice: number;
  currency: string;
  applications: number | 'unlimited';
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeServer();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: Math.round(totalPrice * 100), // Stripe uses cents
          product_data: {
            name: `Wali ${tierName} Plan`,
            description: `${applications === 'unlimited' ? 'Unlimited' : applications} job applications by Wali`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      tierId,
      applications: String(applications),
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}
