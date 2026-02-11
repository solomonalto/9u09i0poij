/**
 * Community Membership Tier Configuration
 * Pricing and benefits for community members joining our platform
 * Platform-level membership for all users, not per-creator subscriptions
 */

export type MemberTier = 'welcome' | 'premium' | 'elite' | 'enterprise';
export type BillingCycle = 'monthly' | 'annual';

interface TierPricing {
  monthly: number;
  annual: number;
}

interface TierConfig {
  name: string;
  displayName: string;
  description: string;
  pricing: TierPricing;
  benefits: string[];
  color: string; // For UI styling
}

const TIER_CONFIGS: Record<MemberTier, TierConfig> = {
  welcome: {
    name: 'welcome',
    displayName: 'Welcome Package',
    description: 'Start your community journey',
    pricing: {
      monthly: 2.99,
      annual: 29.99,
    },
    benefits: [
      'Access to community forums and discussions',
      'Member badge in community',
      'Weekly community newsletters',
      'Access to community events calendar',
      'Exclusive member discounts (up to 5%)',
      'Member-only resource library',
    ],
    color: 'blue',
  },
  premium: {
    name: 'premium',
    displayName: 'Premium Member',
    description: 'Enhanced community experience',
    pricing: {
      monthly: 9.99,
      annual: 99.99,
    },
    benefits: [
      'Everything in Welcome Package',
      'Priority support from our team',
      'Exclusive webinars and workshops (monthly)',
      'Monthly live Q&A sessions with community leaders',
      'Premium member badge highlighting your tier',
      'Ad-free browsing experience',
      'Early access to new community features',
      'Exclusive networking opportunities',
      'Member-exclusive discount code (up to 15%)',
    ],
    color: 'purple',
  },
  elite: {
    name: 'elite',
    displayName: 'Elite Member',
    description: 'Premium access and recognition',
    pricing: {
      monthly: 19.99,
      annual: 199.99,
    },
    benefits: [
      'Everything in Premium Member',
      'Dedicated Elite support channel with fast response',
      'Bi-weekly one-on-one consultation calls (30 min)',
      'Exclusive Elite-only content and resources',
      'Elite badge with special recognition in community',
      'Direct access to community leadership team',
      'Exclusive Elite networking events quarterly',
      'Premium discounts on all services (up to 20%)',
      'Early access to major platform updates and beta features',
      'Personalized onboarding and guidance',
      'VIP members directory listing',
    ],
    color: 'rose',
  },
  enterprise: {
    name: 'enterprise',
    displayName: 'Enterprise Member',
    description: 'Ultimate premium experience',
    pricing: {
      monthly: 49.99,
      annual: 499.99,
    },
    benefits: [
      'Everything in Elite Member',
      '24/7 dedicated enterprise support with priority handling',
      'Weekly one-on-one consultation calls (1 hour each)',
      'Custom content creation tailored to your needs',
      'Enterprise badge with platinum recognition',
      'Direct phone line to community leadership',
      'Invitation to exclusive quarterly enterprise summits',
      'Premium concierge service for all requests',
      'Immediate access to all beta features and new releases',
      'Dedicated success manager assigned to your account',
      'Custom integration support for your use cases',
      'Enterprise-only exclusive event invitations',
      'Annual strategic planning session with leadership',
      'Premium merchandise and gifts (quarterly shipments)',
      'Lifetime member status with legacy benefits',
    ],
    color: 'orange',
  },
};

export function getTierConfig(tier: MemberTier): TierConfig {
  return TIER_CONFIGS[tier];
}

export function getTierPrice(tier: MemberTier, cycle: BillingCycle): number {
  return TIER_CONFIGS[tier].pricing[cycle];
}

export function getBillingPeriodMonths(cycle: BillingCycle): number {
  return cycle === 'annual' ? 12 : 1;
}

export function getEffectiveMonthlyRate(
  tier: MemberTier,
  cycle: BillingCycle
): number {
  const price = getTierPrice(tier, cycle);
  const months = getBillingPeriodMonths(cycle);
  return price / months;
}

export function getAllTiers(): MemberTier[] {
  return ['welcome', 'premium', 'elite', 'enterprise'];
}

export function getTierDisplayName(tier: MemberTier): string {
  return TIER_CONFIGS[tier].displayName;
}

export function getTierDescription(tier: MemberTier): string {
  return TIER_CONFIGS[tier].description;
}

export function getTierBenefits(tier: MemberTier): string[] {
  return TIER_CONFIGS[tier].benefits;
}

export function isValidTierUpgrade(
  currentTier: MemberTier,
  targetTier: MemberTier
): boolean {
  const tierOrder: Record<MemberTier, number> = {
    welcome: 1,
    premium: 2,
    elite: 3,
    enterprise: 4,
  };
  return tierOrder[targetTier] > tierOrder[currentTier];
}

export function getNextTier(tier: MemberTier): MemberTier | null {
  const tiers: MemberTier[] = ['welcome', 'premium', 'elite', 'enterprise'];
  const currentIndex = tiers.indexOf(tier);
  if (currentIndex === -1 || currentIndex === tiers.length - 1) {
    return null;
  }
  return tiers[currentIndex + 1];
}

export function calculateSavings(
  tier: MemberTier
): { amount: number; percentage: number } {
  const monthlyPrice = getTierPrice(tier, 'monthly');
  const annualPrice = getTierPrice(tier, 'annual');
  const annualMonthlyEquivalent = monthlyPrice * 12;
  const savings = annualMonthlyEquivalent - annualPrice;
  const percentage = Math.round((savings / annualMonthlyEquivalent) * 100);

  return {
    amount: savings,
    percentage,
  };
}

export default TIER_CONFIGS;
