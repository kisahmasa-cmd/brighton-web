import { ContactFormTypes } from "../../types/contact-form-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

interface ContactFormResponse {
  Message: {
    Code: number;
    Text: string;
  };
}

export type ContactFormApi = ContactFormResponse;

export const submitContact = (body?: ContactFormTypes) => {
  return apiFetch<ContactFormApi>(`/feedbacks`, {
    body: JSON.stringify(body),
    method: "POST",
  });
};
