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
  plan: string | null;
  status: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
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
