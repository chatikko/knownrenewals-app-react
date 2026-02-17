import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { integrationsApi } from "@/api/integrations";
import { Alert } from "@/components/primitives/Alert";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Select } from "@/components/primitives/Select";
import { EmptyState, ErrorState, LoadingState } from "@/components/QueryState";
import type { SlackConfigPayload } from "@/types/api";

const DEFAULT_CONFIG: SlackConfigPayload = {
  default_channel_id: null,
  default_channel_name: null,
  digest_enabled: true,
  instant_risk_enabled: true,
  instant_due_7d_enabled: true,
  digest_hour_local: 9,
};

function parseError(error: unknown, fallback: string) {
  if (!axios.isAxiosError<{ detail?: string; message?: string }>(error)) return fallback;
  return error.response?.data?.message ?? error.response?.data?.detail ?? fallback;
}

function formatTimestamp(value: string | null) {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleString();
}

export function SlackIntegrationPage() {
  const qc = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [config, setConfig] = useState<SlackConfigPayload>(DEFAULT_CONFIG);

  const callbackState = searchParams.get("slack");
  const callbackReason = searchParams.get("reason");

  const statusQuery = useQuery({
    queryKey: ["integrations", "slack", "status"],
    queryFn: integrationsApi.getSlackStatus,
    retry: false,
  });

  const channelsQuery = useQuery({
    queryKey: ["integrations", "slack", "channels"],
    queryFn: integrationsApi.listSlackChannels,
    retry: false,
    enabled: Boolean(statusQuery.data?.connected),
  });

  useEffect(() => {
    if (!statusQuery.data?.connected) {
      setConfig(DEFAULT_CONFIG);
      return;
    }

    setConfig({
      default_channel_id: statusQuery.data.default_channel_id,
      default_channel_name: statusQuery.data.default_channel_name,
      digest_enabled: statusQuery.data.digest_enabled,
      instant_risk_enabled: statusQuery.data.instant_alerts_available ? statusQuery.data.instant_risk_enabled : false,
      instant_due_7d_enabled: statusQuery.data.instant_alerts_available ? statusQuery.data.instant_due_7d_enabled : false,
      digest_hour_local: statusQuery.data.digest_hour_local,
    });
  }, [statusQuery.data]);

  const installMutation = useMutation({
    mutationFn: integrationsApi.getSlackInstallUrl,
    onSuccess: (url) => {
      if (!url) return;
      window.location.href = url;
    },
  });

  const saveMutation = useMutation({
    mutationFn: integrationsApi.updateSlackConfig,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["integrations", "slack"] });
    },
  });

  const testMutation = useMutation({
    mutationFn: integrationsApi.sendSlackTest,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["integrations", "slack", "status"] });
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: integrationsApi.disconnectSlack,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["integrations", "slack"] });
      setConfig(DEFAULT_CONFIG);
    },
  });

  const callbackAlert = useMemo(() => {
    if (!callbackState) return null;
    if (callbackState === "connected") {
      return { tone: "success" as const, message: "Slack workspace connected successfully." };
    }
    return {
      tone: "danger" as const,
      message: callbackReason ? `Slack connection failed: ${callbackReason}` : "Slack connection failed.",
    };
  }, [callbackReason, callbackState]);

  const dismissCallbackAlert = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("slack");
    next.delete("reason");
    setSearchParams(next, { replace: true });
  };

  if (statusQuery.isLoading) return <LoadingState />;
  if (statusQuery.isError) {
    if (axios.isAxiosError(statusQuery.error)) {
      if (statusQuery.error.response?.status === 403) {
        return <ErrorState message="Account admin access is required to manage Slack alerts." />;
      }
      if (statusQuery.error.response?.status === 404) {
        return <ErrorState message="Slack integration is not enabled in this environment." />;
      }
    }
    return <ErrorState message={parseError(statusQuery.error, "Failed to load Slack integration status.")} />;
  }
  if (!statusQuery.data) return <EmptyState message="Slack integration status is unavailable." />;

  const status = statusQuery.data;
  const instantAlertsLocked = status.founders_digest_only || !status.instant_alerts_available;
  const lastTestLabel =
    status.last_test_success === true
      ? "Successful"
      : status.last_test_success === false
        ? "Failed"
        : "Not sent";
  const options = (channelsQuery.data ?? []).map((channel) => ({
    value: channel.id,
    label: `#${channel.name}`,
  }));
  if (status.default_channel_id && status.default_channel_name && !options.some((item) => item.value === status.default_channel_id)) {
    options.unshift({
      value: status.default_channel_id,
      label: `#${status.default_channel_name}`,
    });
  }
  options.unshift({ value: "", label: "Select a Slack channel" });

  const selectedChannelName =
    options.find((item) => item.value === (config.default_channel_id ?? ""))?.label.replace(/^#/, "") ?? null;
  const showChannelReconfigurationWarning = !status.default_channel_id || Boolean(status.last_error_message);
  const channelReconfigurationMessage = status.last_error_message
    ? `Slack is connected, but default channel must be reselected. Token is still connected; choose a channel and save. Last Slack error: ${status.last_error_message}`
    : "Slack is connected, but default channel must be reselected. Token is still connected; choose a channel and save.";

  return (
    <div className="max-w-4xl space-y-lg">
      <div className="space-y-xs">
        <h1 className="text-h1">Slack Alerts</h1>
        <p className="text-small text-text-secondary">
          Send renewal risk alerts and daily renewal digests to one Slack channel for your account.
        </p>
      </div>

      {callbackAlert ? (
        <div className="flex flex-wrap items-center gap-sm">
          <Alert tone={callbackAlert.tone} message={callbackAlert.message} />
          <Button variant="ghost" className="px-sm py-xs text-small" onClick={dismissCallbackAlert}>
            Dismiss
          </Button>
        </div>
      ) : null}

      {!status.connected ? (
        <Card className="space-y-md">
          <h2 className="text-h2">Connect Slack</h2>
          {instantAlertsLocked ? (
            <Alert tone="info" message="Instant Slack alerts are available on Pro and Team plans." />
          ) : null}
          {status.last_error_message ? (
            <Alert
              tone="warning"
              message={`The previous Slack connection failed: ${status.last_error_message}. Reconnect to resume alerts.`}
            />
          ) : null}
          <p className="text-small text-text-secondary">
            Connect one workspace and choose a default channel. KnowRenewals will post:
          </p>
          <ul className="list-disc space-y-xs pl-lg text-small text-text-secondary">
            <li>Auto-creates a dedicated <span className="font-medium">#knowrenewal</span> channel when workspace permissions allow it</li>
            <li>Daily digest at 09:00 account timezone</li>
            {instantAlertsLocked ? (
              <li>Instant alerts are unlocked on Pro and Team plans.</li>
            ) : (
              <>
                <li>Instant alerts for risk renewals</li>
                <li>Instant alerts for renewals due within 7 days</li>
              </>
            )}
          </ul>
          {installMutation.isError ? (
            <Alert tone="danger" message={parseError(installMutation.error, "Could not start Slack connection.")} />
          ) : null}
          <Button isLoading={installMutation.isPending} onClick={() => installMutation.mutate()}>
            Connect Slack
          </Button>
        </Card>
      ) : (
        <>
          <Card className="space-y-md">
            <div className="space-y-xs">
              <h2 className="text-h2">Workspace</h2>
              <p className="text-small text-text-secondary">
                Connected to <span className="font-medium text-text-primary">{status.workspace_name ?? "Slack"}</span>.
              </p>
              <p className="text-small text-text-secondary">
                Digest time: 09:00 ({status.timezone})
              </p>
              {showChannelReconfigurationWarning ? (
                <Alert tone="warning" message={channelReconfigurationMessage} />
              ) : status.is_degraded ? (
                <Alert
                  tone="warning"
                  message={
                    status.last_error_message
                      ? `Delivery is degraded: ${status.last_error_message}`
                      : "Delivery is degraded. Reconnect Slack if alerts are not sending."
                  }
                />
              ) : null}
            </div>
          </Card>

          <Card className="space-y-md">
            <h2 className="text-h2">Alert Configuration</h2>
            {channelsQuery.isError ? (
              <Alert tone="danger" message={parseError(channelsQuery.error, "Could not load Slack channels.")} />
            ) : null}
            {instantAlertsLocked ? (
              <Alert tone="info" message="Instant Slack alerts are available on Pro and Team plans." />
            ) : null}
            <div className="grid gap-md">
              <Select
                label="Default Channel"
                value={config.default_channel_id ?? ""}
                options={options}
                onChange={(event) => {
                  const value = event.target.value || null;
                  const name =
                    value && value !== ""
                      ? options.find((item) => item.value === value)?.label.replace(/^#/, "") ?? null
                      : null;
                  setConfig((previous) => ({ ...previous, default_channel_id: value, default_channel_name: name }));
                }}
                disabled={channelsQuery.isLoading || saveMutation.isPending}
              />

              <label className="inline-flex items-center gap-xs rounded-md border border-border bg-background px-md py-sm text-small">
                <input
                  type="checkbox"
                  checked={config.digest_enabled}
                  onChange={(event) => setConfig((previous) => ({ ...previous, digest_enabled: event.target.checked }))}
                  disabled={saveMutation.isPending}
                />
                Daily digest at 09:00 local account time
              </label>

              <label className="inline-flex items-center gap-xs rounded-md border border-border bg-background px-md py-sm text-small">
                <input
                  type="checkbox"
                  checked={config.instant_risk_enabled}
                  onChange={(event) => setConfig((previous) => ({ ...previous, instant_risk_enabled: event.target.checked }))}
                  disabled={saveMutation.isPending || instantAlertsLocked}
                />
                Instant alerts when contracts are in risk window
              </label>

              <label className="inline-flex items-center gap-xs rounded-md border border-border bg-background px-md py-sm text-small">
                <input
                  type="checkbox"
                  checked={config.instant_due_7d_enabled}
                  onChange={(event) =>
                    setConfig((previous) => ({ ...previous, instant_due_7d_enabled: event.target.checked }))
                  }
                  disabled={saveMutation.isPending || instantAlertsLocked}
                />
                Instant alerts when renewals are due within 7 days
              </label>
            </div>

            {saveMutation.isError ? (
              <Alert tone="danger" message={parseError(saveMutation.error, "Could not save Slack configuration.")} />
            ) : null}
            {saveMutation.isSuccess ? <Alert tone="success" message="Slack configuration saved." /> : null}
            <Button
              isLoading={saveMutation.isPending}
              disabled={!config.default_channel_id || channelsQuery.isLoading}
              onClick={() =>
                saveMutation.mutate({
                  ...config,
                  default_channel_id: config.default_channel_id,
                  default_channel_name: selectedChannelName,
                })
              }
            >
              Save Configuration
            </Button>
          </Card>

          <Card className="space-y-md">
            <h2 className="text-h2">Health and Actions</h2>
            <p className="text-small text-text-secondary">
              Last test message: {lastTestLabel} ({formatTimestamp(status.last_test_sent_at)})
            </p>
            {testMutation.isError ? (
              <Alert tone="danger" message={parseError(testMutation.error, "Slack test message failed.")} />
            ) : null}
            {testMutation.isSuccess ? (
              <Alert tone="success" message={testMutation.data.message ?? "Test message sent."} />
            ) : null}
            {disconnectMutation.isError ? (
              <Alert tone="danger" message={parseError(disconnectMutation.error, "Could not disconnect Slack.")} />
            ) : null}
            {disconnectMutation.isSuccess ? <Alert tone="success" message={disconnectMutation.data} /> : null}

            <div className="flex flex-wrap gap-sm">
              <Button
                variant="secondary"
                disabled={!config.default_channel_id}
                isLoading={testMutation.isPending}
                onClick={() => testMutation.mutate()}
              >
                Send Test Message
              </Button>
              <Button
                variant="danger"
                isLoading={disconnectMutation.isPending}
                onClick={() => {
                  if (!window.confirm("Disconnect Slack for this account? Alerts will stop until reconnected.")) return;
                  disconnectMutation.mutate();
                }}
              >
                Disconnect Slack
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
