import { TestimoniData, TestimoniesParams } from "../../types/testimoni-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type TestimoniesResponse = ApiResponse<TestimoniData[]>;

export const getTestimonies = async (params: TestimoniesParams) => {
  return apiFetch<TestimoniesResponse>(`/testimonies`, {
    params: { ...params },
  });
};
