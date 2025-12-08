interface ApiListResponse<T> {
  Data: T[];
  Count: number;
  __error: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DEFAULT_RESPONSE: ApiListResponse<any> = {
  Data: [],
  Count: 0,
  __error: true,
};
