import { WaliService } from '@/types';

export const WALI_SERVICES: WaliService[] = [
  {
    id: 'job-applications',
    name: 'Job Applications',
    description:
      'Wali applies to jobs on your behalf across LinkedIn and Nakuri. Set your preferences, upload your resume, and let Wali handle the rest.',
    icon: 'Briefcase',
    available: true,
    pricing: 'From $0.60/application',
  },
  {
    id: 'resume-optimization',
    name: 'Resume Optimization',
    description:
      'Wali analyzes job descriptions and tailors your resume for each application, maximizing your match rate.',
    icon: 'FileText',
    available: false,
    comingSoon: true,
  },
  {
    id: 'interview-prep',
    name: 'Interview Preparation',
    description:
      'Mock interviews powered by AI. Wali simulates real interview scenarios based on the company and role.',
    icon: 'MessageSquare',
    available: false,
    comingSoon: true,
  },
  {
    id: 'salary-negotiation',
    name: 'Salary Negotiation',
    description:
      'Wali researches market rates and coaches you through salary negotiations with data-driven insights.',
    icon: 'TrendingUp',
    available: false,
    comingSoon: true,
  },
  {
    id: 'linkedin-optimization',
    name: 'LinkedIn Profile Optimization',
    description:
      'Wali rewrites and optimizes your LinkedIn profile to attract recruiters and increase visibility.',
    icon: 'User',
    available: false,
    comingSoon: true,
  },
  {
    id: 'networking',
    name: 'Networking Outreach',
    description:
      'Wali identifies and reaches out to relevant professionals in your target industry on your behalf.',
    icon: 'Users',
    available: false,
    comingSoon: true,
  },
];
