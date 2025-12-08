import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";
import {
  Consignment,
  ConsignmentParams,
} from "../../types/consignment-types";

export type ConsignmentResponse = ApiResponse<Consignment>;

export const postConsignment = (params?: ConsignmentParams) => {
  const defaultParams: ConsignmentParams = {
    Language: 'id',
  };

  const mergedParams = { ...defaultParams, ...params };

  return apiFetch<ConsignmentResponse>(`/property-support/add`, {
    base: "api",
    body: JSON.stringify(mergedParams),
    method: "POST",
    withAccessToken: true,
    formData: true,
  });
};
