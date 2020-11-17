export type AsyncState<Meta = any, Payload = any> = {
  request: Meta | null;
  data: Payload | null;
  pending: boolean | null;
  error: string;
};
