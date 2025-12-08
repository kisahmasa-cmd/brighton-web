import { AgentRegistrationRequest, AgentRegistrationResponse } from "../../types/agent-registration-types";
import {
  GetAgentSearchData,
  GetAgentSearchParams,
} from "../../types/get-agent-search-types";
import { base64ToBlob } from "../../utils/base64ToBlob";
import { apiFetch } from "./api";

export const getAgentSearch = async (searchTerm: string) => {
  const params: GetAgentSearchParams = {
    searchTerm,
    key: "4646123", // the key must this
  };

  return apiFetch<GetAgentSearchData[]>("/agent/getagentsearch", {
    body: JSON.stringify(params),
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    formEncoded: true,
    withClientId: false,
  });
};

export const agentRegistration = async (request: AgentRegistrationRequest) => {
  const formData = new FormData();
  Object.entries(request).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return apiFetch<AgentRegistrationResponse>("/agent/agentregistrationajax", {
    formDataBody: formData,
    method: "POST",
    formData: true,
    withClientId: false,
  });
};
