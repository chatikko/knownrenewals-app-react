export type PlanTier = "founders" | "pro" | "team";
export type BillingCycle = "monthly" | "yearly";

export type PricingPlan = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  tagline?: string;
  featured?: boolean;
  features: string[];
  renewalsLimit: string;
  seats: string;
  reminderAutomation: string;
  slackDigest: string;
  slackInstantAlerts: string;
  teamWorkflows: string;
  support: string;
  fit: string;
};

export type PricingComparisonRow = {
  capability: string;
  founders: string;
  pro: string;
  team: string;
};

export const PRICING_PLANS: Record<PlanTier, PricingPlan> = {
  founders: {
    name: "Founders",
    monthlyPrice: 19,
    yearlyPrice: 190,
    tagline: "Only for first 50 users",
    features: ["Up to 25 renewals", "1 user", "Email reminders", "CSV import & export"],
    renewalsLimit: "Up to 25 renewals",
    seats: "1 user",
    reminderAutomation: "Email reminder cadence",
    slackDigest: "Included",
    slackInstantAlerts: "Not included",
    teamWorkflows: "Single-owner workflow",
    support: "Standard support",
    fit: "Solo founders or early-stage operators moving from spreadsheet tracking.",
  },
  pro: {
    name: "Pro",
    monthlyPrice: 99,
    yearlyPrice: 990,
    tagline: "Most Popular",
    featured: true,
    features: ["Unlimited renewals", "Up to 5 users", "Custom reminder schedules", "Team-wide visibility"],
    renewalsLimit: "Unlimited renewals",
    seats: "Up to 5 users",
    reminderAutomation: "Custom reminder schedules",
    slackDigest: "Included",
    slackInstantAlerts: "Risk + due-in-7-days alerts",
    teamWorkflows: "Shared owner workflows",
    support: "Priority email support",
    fit: "Finance, ops, and IT teams with recurring renewals across multiple owners.",
  },
  team: {
    name: "Team",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: ["Up to 15 users", "Role-based access", "Shared renewal ownership", "Priority support"],
    renewalsLimit: "Unlimited renewals",
    seats: "Up to 15 users",
    reminderAutomation: "Custom + team escalation rules",
    slackDigest: "Included",
    slackInstantAlerts: "Risk + due-in-7-days alerts",
    teamWorkflows: "Role-based ownership and collaboration",
    support: "Priority support",
    fit: "Growing companies running cross-functional renewal operations at scale.",
  },
};

export const PRICING_COMPARISON_ROWS: PricingComparisonRow[] = [
  {
    capability: "Renewals tracked",
    founders: PRICING_PLANS.founders.renewalsLimit,
    pro: PRICING_PLANS.pro.renewalsLimit,
    team: PRICING_PLANS.team.renewalsLimit,
  },
  {
    capability: "Users / seats",
    founders: PRICING_PLANS.founders.seats,
    pro: PRICING_PLANS.pro.seats,
    team: PRICING_PLANS.team.seats,
  },
  {
    capability: "Reminder automation",
    founders: PRICING_PLANS.founders.reminderAutomation,
    pro: PRICING_PLANS.pro.reminderAutomation,
    team: PRICING_PLANS.team.reminderAutomation,
  },
  {
    capability: "Slack daily digest",
    founders: PRICING_PLANS.founders.slackDigest,
    pro: PRICING_PLANS.pro.slackDigest,
    team: PRICING_PLANS.team.slackDigest,
  },
  {
    capability: "Slack instant alerts",
    founders: PRICING_PLANS.founders.slackInstantAlerts,
    pro: PRICING_PLANS.pro.slackInstantAlerts,
    team: PRICING_PLANS.team.slackInstantAlerts,
  },
  {
    capability: "CSV import and export",
    founders: "Included",
    pro: "Included",
    team: "Included",
  },
  {
    capability: "Team workflows",
    founders: PRICING_PLANS.founders.teamWorkflows,
    pro: PRICING_PLANS.pro.teamWorkflows,
    team: PRICING_PLANS.team.teamWorkflows,
  },
  {
    capability: "Support",
    founders: PRICING_PLANS.founders.support,
    pro: PRICING_PLANS.pro.support,
    team: PRICING_PLANS.team.support,
  },
];

