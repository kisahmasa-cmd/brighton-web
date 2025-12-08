import { NewsletterParams } from "../../types/newsletter-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export const subscribeNewsletter = (params: NewsletterParams) => {
  return apiFetch<ApiResponse<null>>('/newsletters/subscribes', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
