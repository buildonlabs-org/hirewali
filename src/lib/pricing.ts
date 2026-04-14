import { RegionalPricing, PricingRegion } from '@/types';

export const PRICING_DATA: Record<PricingRegion, RegionalPricing> = {
  us: {
    region: 'us',
    regionName: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    tiers: [
      {
        id: 'starter-us',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 3.00,
        totalPrice: 75,
        currency: 'USD',
      },
      {
        id: 'pro-us',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 2.00,
        totalPrice: 200,
        currency: 'USD',
        popular: true,
      },
      {
        id: 'scale-us',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 1.50,
        totalPrice: 750,
        currency: 'USD',
      },
    ],
  },
  eu: {
    region: 'eu',
    regionName: 'Europe',
    currency: 'EUR',
    currencySymbol: '€',
    tiers: [
      {
        id: 'starter-eu',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 2.80,
        totalPrice: 70,
        currency: 'EUR',
      },
      {
        id: 'pro-eu',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 1.80,
        totalPrice: 180,
        currency: 'EUR',
        popular: true,
      },
      {
        id: 'scale-eu',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 1.30,
        totalPrice: 650,
        currency: 'EUR',
      },
    ],
  },
  uk: {
    region: 'uk',
    regionName: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    tiers: [
      {
        id: 'starter-uk',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 2.40,
        totalPrice: 60,
        currency: 'GBP',
      },
      {
        id: 'pro-uk',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 1.60,
        totalPrice: 160,
        currency: 'GBP',
        popular: true,
      },
      {
        id: 'scale-uk',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 1.20,
        totalPrice: 600,
        currency: 'GBP',
      },
    ],
  },
  ca: {
    region: 'ca',
    regionName: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    tiers: [
      {
        id: 'starter-ca',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 3.60,
        totalPrice: 90,
        currency: 'CAD',
      },
      {
        id: 'pro-ca',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 2.50,
        totalPrice: 250,
        currency: 'CAD',
        popular: true,
      },
      {
        id: 'scale-ca',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 1.80,
        totalPrice: 900,
        currency: 'CAD',
      },
    ],
  },
  au: {
    region: 'au',
    regionName: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    tiers: [
      {
        id: 'starter-au',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 4.00,
        totalPrice: 100,
        currency: 'AUD',
      },
      {
        id: 'pro-au',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 2.80,
        totalPrice: 280,
        currency: 'AUD',
        popular: true,
      },
      {
        id: 'scale-au',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 2.00,
        totalPrice: 1000,
        currency: 'AUD',
      },
    ],
  },
  in: {
    region: 'in',
    regionName: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    tiers: [
      {
        id: 'starter-in',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 40,
        totalPrice: 999,
        currency: 'INR',
      },
      {
        id: 'pro-in',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 25,
        totalPrice: 2499,
        currency: 'INR',
        popular: true,
      },
      {
        id: 'scale-in',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 18,
        totalPrice: 8999,
        currency: 'INR',
      },
    ],
  },
  sea: {
    region: 'sea',
    regionName: 'Southeast Asia',
    currency: 'USD',
    currencySymbol: '$',
    tiers: [
      {
        id: 'starter-sea',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 1.20,
        totalPrice: 30,
        currency: 'USD',
      },
      {
        id: 'pro-sea',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 0.80,
        totalPrice: 80,
        currency: 'USD',
        popular: true,
      },
      {
        id: 'scale-sea',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 0.60,
        totalPrice: 300,
        currency: 'USD',
      },
    ],
  },
  latam: {
    region: 'latam',
    regionName: 'Latin America',
    currency: 'USD',
    currencySymbol: '$',
    tiers: [
      {
        id: 'starter-latam',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 1.60,
        totalPrice: 40,
        currency: 'USD',
      },
      {
        id: 'pro-latam',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 1.00,
        totalPrice: 100,
        currency: 'USD',
        popular: true,
      },
      {
        id: 'scale-latam',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 0.80,
        totalPrice: 400,
        currency: 'USD',
      },
    ],
  },
  africa: {
    region: 'africa',
    regionName: 'Africa',
    currency: 'USD',
    currencySymbol: '$',
    tiers: [
      {
        id: 'starter-africa',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 1.20,
        totalPrice: 30,
        currency: 'USD',
      },
      {
        id: 'pro-africa',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 0.80,
        totalPrice: 80,
        currency: 'USD',
        popular: true,
      },
      {
        id: 'scale-africa',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 0.60,
        totalPrice: 300,
        currency: 'USD',
      },
    ],
  },
  mena: {
    region: 'mena',
    regionName: 'Middle East & North Africa',
    currency: 'USD',
    currencySymbol: '$',
    tiers: [
      {
        id: 'starter-mena',
        name: 'Starter',
        applications: 25,
        pricePerApplication: 2.00,
        totalPrice: 50,
        currency: 'USD',
      },
      {
        id: 'pro-mena',
        name: 'Pro',
        applications: 100,
        pricePerApplication: 1.40,
        totalPrice: 140,
        currency: 'USD',
        popular: true,
      },
      {
        id: 'scale-mena',
        name: 'Scale',
        applications: 500,
        pricePerApplication: 1.00,
        totalPrice: 500,
        currency: 'USD',
      },
    ],
  },
};

export function detectRegion(countryCode?: string): PricingRegion {
  if (!countryCode) return 'us';

  const regionMap: Record<string, PricingRegion> = {
    US: 'us',
    CA: 'ca',
    GB: 'uk',
    AU: 'au',
    NZ: 'au',
    IN: 'in',
    // EU
    DE: 'eu', FR: 'eu', IT: 'eu', ES: 'eu', NL: 'eu', BE: 'eu',
    AT: 'eu', PT: 'eu', IE: 'eu', FI: 'eu', SE: 'eu', DK: 'eu',
    NO: 'eu', PL: 'eu', CZ: 'eu', RO: 'eu', HU: 'eu', GR: 'eu',
    CH: 'eu', LU: 'eu',
    // SEA
    SG: 'sea', MY: 'sea', TH: 'sea', VN: 'sea', PH: 'sea',
    ID: 'sea', MM: 'sea', KH: 'sea', LA: 'sea',
    // LATAM
    BR: 'latam', MX: 'latam', AR: 'latam', CO: 'latam', CL: 'latam',
    PE: 'latam', EC: 'latam', VE: 'latam', UY: 'latam',
    // Africa
    NG: 'africa', ZA: 'africa', KE: 'africa', GH: 'africa', ET: 'africa',
    TZ: 'africa', UG: 'africa', RW: 'africa', SN: 'africa',
    // MENA
    AE: 'mena', SA: 'mena', QA: 'mena', KW: 'mena', BH: 'mena',
    OM: 'mena', EG: 'mena', JO: 'mena', LB: 'mena', MA: 'mena',
    TN: 'mena', IL: 'mena',
  };

  return regionMap[countryCode.toUpperCase()] || 'us';
}

export function formatPrice(amount: number, currency: string, symbol: string): string {
  if (currency === 'INR') {
    return `${symbol}${amount.toLocaleString('en-IN')}`;
  }
  return `${symbol}${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}
