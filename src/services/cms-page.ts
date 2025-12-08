import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type HtmlCMSResponse = ApiResponse<HTMLDocumentType>;

export const getHtmlCMS = (URLSegment: string) => {
  return apiFetch<HtmlCMSResponse>("/pages", {
    params: { URLSegment },
  });
};
