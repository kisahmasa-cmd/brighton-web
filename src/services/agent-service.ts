import { Agent, AgentParams, AgentRecommendationParams, CityData } from "../../types/agent-types";
import { City } from "../../types/location-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type CityDataResponse = ApiResponse<CityData[]>;
export type CityListDataResponse = ApiResponse<City[]>;
export type AgentDataResponse = ApiResponse<Agent[]>;
export type AgentDetailDataResponse = ApiResponse<Agent>;

export const getCityAgent = () =>
  apiFetch<CityDataResponse>(`/agent-api/searchlocation`, {
    base: "old",
  });

export const getListCityAgent = () =>
  apiFetch<CityListDataResponse>(`/agent-api/getagentlistlocation`, {
    base: "old",
  });

export const getListOffice = () =>
  apiFetch<CityListDataResponse>(`/home/getseachfilter/Unit`, {
    base: "old",
  });
export const getDataAgent = (params?: AgentParams) => {
  const defaultParams: AgentParams = {
    Count: 12,
    Start: 0,
    IsNewWeb: true,
  };

  const mergedParams = { ...defaultParams, ...params };
  if (mergedParams.Keyword) {
    mergedParams.Keyword = mergedParams.Keyword;
  }
  return apiFetch<AgentDataResponse>(`/agent/search`, {
    base: "node",
    body: JSON.stringify(mergedParams),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    formEncoded: true,
    withClientId: false,
  });
};

export const getAgentDetail = (agentSlug: string, params?: AgentParams) => {
  const defaultParams: AgentParams = {
    Count: 5,
    Start: 0,
    IsNewWeb: true,
  };

  const mergedParams = { ...defaultParams, ...params };

  return apiFetch<AgentDetailDataResponse>(`/agent-api/view/${agentSlug}`, {
    base: "old",
    params: mergedParams,
  });
};

export const getAgentRecommendation = (agentSlug: string, params?: AgentRecommendationParams) => {
  const defaultParams: AgentRecommendationParams = {
    Skip: 0,
    Limit: 3,
  };

  const mergedParams = { ...defaultParams, ...params };

  return apiFetch<AgentDataResponse>(`/propertysupport-api/loadmoreagents`, {
    base: "old",
    params: mergedParams,
  });
};
