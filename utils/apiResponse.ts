export interface ApiMessage {
  Code: number;
  Text: string;
}

export interface ApiResponse<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __error?: any;
  Message?: ApiMessage;
  Data: T;
  NextStart?: number;
  Count: number;
  All?: number;
  Code?: number;
  Pagination?: ApiPagination;
  AccessToken?: string;
}

export interface ApiPagination {
  Count: number;
  Page: number;
  Next: number | null;
  Prev: number | null;
}
