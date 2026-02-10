import { http } from "@/api/http";
import type { CommonResponse, ListResponse, Member } from "@/types/api";

export const usersApi = {
  listMembers: async () => {
    const res = await http.get<ListResponse<Member>>("/users/members");
    return res.data;
  },
  createMember: async (payload: { email: string; password: string; is_admin: boolean }) => {
    const res = await http.post<CommonResponse<Member>>("/users/members", payload);
    return res.data;
  },
  removeMember: async (userId: string) => {
    const res = await http.delete<CommonResponse<null>>(`/users/members/${userId}`);
    return res.data;
  },
};
