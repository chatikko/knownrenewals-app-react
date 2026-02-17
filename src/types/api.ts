export type CommonResponse<T> = {
  success: boolean;
  data: T;
  message: string | null;
  status_code: number;
};

export type ListResponse<T> = {
  success: boolean;
  items: T[];
  total: number;
  status_code: number;
};

export type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
};

export type ContractStatus = "safe" | "soon" | "risk";

export type Contract = {
  id: string;
  account_id: string;
  vendor_name: string;
  renewal_type?: string | null;
  renewal_name?: string | null;
  contract_name: string | null;
  renewal_date: string;
  notice_period_days: number;
  notice_deadline: string;
  owner_email: string;
  status: ContractStatus;
  created_at: string;
  updated_at: string;
};

export type BillingStatus = {
  plan_tier?: string | null;
  plan: string | null;
  status: string | null;
  cancel_at_period_end?: boolean;
  trial_days_left?: number | null;
  grace_days_left?: number | null;
  read_only_mode?: boolean;
  trial_expired?: boolean;
  founders_available?: boolean;
  founders_slots_remaining?: number | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
};

export type Member = {
  id: string;
  account_id: string;
  email: string;
  is_active: boolean;
  is_email_verified: boolean;
  is_admin: boolean;
  created_at: string;
};

export type AdminUser = {
  id: string;
  account_id: string;
  email: string;
  is_active: boolean;
  is_email_verified: boolean;
  is_admin: boolean;
  created_at: string;
};

export type AdminAccount = {
  id: string;
  name: string;
  owner_email: string;
  plan: string;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
};

export type AdminContract = {
  id: string;
  account_id: string;
  vendor_name: string;
  contract_name: string | null;
  renewal_date: string;
  notice_period_days: number;
  notice_deadline: string;
  owner_email: string;
  status: ContractStatus;
  created_at: string;
};

export type AdminAuthEvent = {
  id: string;
  user_id: string | null;
  event_type: string;
  ip_address: string | null;
  user_agent: string | null;
  success: boolean;
  created_at: string;
};

export type AdminBillingEvent = {
  id: string;
  account_id: string | null;
  stripe_event_id: string;
  event_type: string;
  status: string;
  created_at: string;
};

export type SlackIntegrationStatus = {
  slack_integration_enabled: boolean;
  connected: boolean;
  plan_tier: string;
  instant_alerts_available: boolean;
  founders_digest_only: boolean;
  workspace_id: string | null;
  workspace_name: string | null;
  default_channel_id: string | null;
  default_channel_name: string | null;
  digest_enabled: boolean;
  instant_risk_enabled: boolean;
  instant_due_7d_enabled: boolean;
  digest_hour_local: number;
  timezone: string;
  is_degraded: boolean;
  last_error_code: string | null;
  last_error_message: string | null;
  last_error_at: string | null;
  last_test_success: boolean | null;
  last_test_sent_at: string | null;
};

export type SlackChannel = {
  id: string;
  name: string;
};

export type SlackConfigPayload = {
  default_channel_id: string | null;
  default_channel_name: string | null;
  digest_enabled: boolean;
  instant_risk_enabled: boolean;
  instant_due_7d_enabled: boolean;
  digest_hour_local: number;
};

export type SlackTestResponse = {
  message: string;
  sent_at: string;
};
