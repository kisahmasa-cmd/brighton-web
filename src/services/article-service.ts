import { ArticleCategory, ArticleItem, ArticlesFilterParams, ArticleTag } from "../../types/article-types";
import { ApiResponse } from "../../utils/apiResponse";
import { apiFetch } from "./api";

export type ArticlesResponse = ApiResponse<ArticleItem[]>;
export type ArticleCategoriesResponse = ApiResponse<ArticleCategory[]>;
export type ArticleTagsResponse = ApiResponse<ArticleTag[]>;
export type ArticleDetailResponse = ApiResponse<ArticleItem>;

export const getArticles = (params?: ArticlesFilterParams, NotCache: boolean = true) => {
  return apiFetch<ArticlesResponse>(`/articles`, {
    params: {
      OrderBy: params?.OrderBy === "" ? undefined : params?.OrderBy,
      Category: params?.Category,
      Keyword: params?.Keyword,
      Count: params?.Count,
      Page: params?.Page,
      Tags: params?.Tags === undefined ? undefined : params?.Tags.join(","),
    },
    dynamic: NotCache,
  });
};

export const getArticleCategories = () => {
  return apiFetch<ArticleCategoriesResponse>("/articles/categories");
};

export const getArticleTags = () => {
  return apiFetch<ArticleTagsResponse>("/articles/tags");
};

export const getArticleDetail = (slug: string) => {
  return apiFetch<ArticleDetailResponse>(`/articles/${slug}`);
};
