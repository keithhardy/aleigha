export type ServerActionResponse<T> = {
  status: 'success' | 'error';
  heading: string;
  message: string;
  payload?: T;
};