export interface UserProfile {
  id: string;
  email: string;
  name: string;
  resumeUrl?: string;
  linkedInUrl?: string;
  preferences?: JobPreferences;
  region: PricingRegion;
  createdAt: Date;
}

export interface JobPreferences {
  titles: string[];
  locations: string[];
  remote: boolean;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  industries: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  skills: string[];
  excludeCompanies?: string[];
}

export interface JobApplication {
  id: string;
  userId: string;
  jobTitle: string;
  company: string;
  platform: 'linkedin' | 'nakuri';
  status: 'queued' | 'applying' | 'applied' | 'failed';
  appliedAt?: Date;
  jobUrl?: string;
  notes?: string;
}

export type PricingRegion =
  | 'us'
  | 'eu'
  | 'uk'
  | 'ca'
  | 'au'
  | 'in'
  | 'sea'
  | 'latam'
  | 'africa'
  | 'mena';

export interface PricingTier {
  id: string;
  name: string;
  applications: number | 'unlimited';
  pricePerApplication: number;
  totalPrice: number;
  currency: string;
  popular?: boolean;
}

export interface RegionalPricing {
  region: PricingRegion;
  regionName: string;
  currency: string;
  currencySymbol: string;
  tiers: PricingTier[];
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    applicationsFound?: number;
    applicationsSubmitted?: number;
    platform?: string;
  };
}

export interface WaliService {
  id: string;
  name: string;
  description: string;
  icon: string;
  available: boolean;
  comingSoon?: boolean;
  pricing?: string;
}
