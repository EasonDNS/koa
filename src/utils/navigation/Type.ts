interface IDbResponse<T = unknown> {
  message: string;
  code?: number;
  data: T | null;
  error?: any;
}

export type { IDbResponse };
