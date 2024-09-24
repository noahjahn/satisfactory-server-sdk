export type GetServerOptionsRequestData = undefined;

export type GetServerOptionsResponseBody = {
  serverOptions: Record<string, string>;
  pendingServerOptions: Record<string, string>;
};

export type GetServerOptions = {
  functionName: 'getserveroptions';
  requestType: GetServerOptionsRequestData;
  responseType: GetServerOptionsResponseBody;
};
