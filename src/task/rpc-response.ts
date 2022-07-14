export interface RpcResponse<T> {
  jsonrpc: string;
  result: T;
  id: number;
}
