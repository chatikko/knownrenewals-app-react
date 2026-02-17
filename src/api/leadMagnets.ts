import { publicHttp } from "@/api/http";
import type {
  CommonResponse,
  LeadMagnetSubmitPayload,
  LeadMagnetSubmitResponse,
} from "@/types/api";

export const leadMagnetsApi = {
  submitRenewalTemplate: async (payload: LeadMagnetSubmitPayload) => {
    const res = await publicHttp.post<CommonResponse<LeadMagnetSubmitResponse>>(
      "/lead-magnets/renewal-template/submit",
      payload,
    );
    return res.data.data;
  },
};
