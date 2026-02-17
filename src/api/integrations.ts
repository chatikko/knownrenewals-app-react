import { http } from "@/api/http";
import type {
  CommonResponse,
  ListResponse,
  SlackChannel,
  SlackConfigPayload,
  SlackIntegrationStatus,
  SlackTestResponse,
} from "@/types/api";

export const integrationsApi = {
  getSlackInstallUrl: async () => {
    const res = await http.get<CommonResponse<{ url: string }>>("/integrations/slack/install-url");
    return res.data.data?.url ?? "";
  },
  getSlackStatus: async () => {
    const res = await http.get<CommonResponse<SlackIntegrationStatus>>("/integrations/slack/status");
    return res.data.data as SlackIntegrationStatus;
  },
  listSlackChannels: async () => {
    const res = await http.get<ListResponse<SlackChannel>>("/integrations/slack/channels");
    return res.data.items;
  },
  updateSlackConfig: async (payload: SlackConfigPayload) => {
    const res = await http.put<CommonResponse<SlackIntegrationStatus>>("/integrations/slack/config", payload);
    return res.data.data as SlackIntegrationStatus;
  },
  sendSlackTest: async () => {
    const res = await http.post<CommonResponse<SlackTestResponse>>("/integrations/slack/test");
    return res.data.data as SlackTestResponse;
  },
  disconnectSlack: async () => {
    const res = await http.delete<CommonResponse<{ message: string }>>("/integrations/slack/disconnect");
    return res.data.data?.message ?? "Slack integration disconnected.";
  },
};
