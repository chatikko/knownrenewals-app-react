export const RENEWAL_TYPES = [
  "Subscription",
  "Contract",
  "License",
  "Domain",
  "Certificate",
  "Other",
] as const;

export type RenewalType = (typeof RENEWAL_TYPES)[number];

export const REMINDER_PRESETS = [
  { label: "7 days before", value: 7 },
  { label: "14 days before", value: 14 },
  { label: "30 days before", value: 30 },
  { label: "60 days before", value: 60 },
] as const;

const CONTRACT_NAME_PREFIX = /^\[([^\]]+)\]\s*(.*)$/;

export function parseRenewalName(contractName: string | null | undefined): {
  renewalType: RenewalType;
  renewalName: string;
} {
  const name = (contractName ?? "").trim();
  if (!name) return { renewalType: "Contract", renewalName: "" };

  const match = name.match(CONTRACT_NAME_PREFIX);
  if (!match) return { renewalType: "Contract", renewalName: name };

  const type = (RENEWAL_TYPES as readonly string[]).includes(match[1]) ? (match[1] as RenewalType) : "Other";
  return { renewalType: type, renewalName: match[2].trim() };
}

export function extractRenewal(
  data: { renewal_type?: string | null; renewal_name?: string | null; contract_name?: string | null },
): { renewalType: RenewalType; renewalName: string } {
  const type = (data.renewal_type ?? "").trim();
  const name = (data.renewal_name ?? "").trim();
  if (type && name) {
    const typed = (RENEWAL_TYPES as readonly string[]).includes(type) ? (type as RenewalType) : "Other";
    return { renewalType: typed, renewalName: name };
  }
  return parseRenewalName(data.contract_name);
}

export function formatContractName(type: RenewalType, renewalName: string): string {
  const safeName = renewalName.trim();
  if (!safeName) return "";
  return `[${type}] ${safeName}`;
}

export function isPresetReminder(days: number): boolean {
  return REMINDER_PRESETS.some((preset) => preset.value === days);
}
