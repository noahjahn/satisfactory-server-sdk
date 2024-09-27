export type GetServerOptionsRequestData = undefined;

export type GetServerOptionsResponseBody = {
  serverOptions: Record<string, string> & {
    'FG.DSAutoPause': 'True' | string;
    'FG.DSAutoSaveOnDisconnect': 'True' | string;
    'FG.AutosaveInterval': string;
    'FG.ServerRestartTimeSlot': string;
    'FG.SendGameplayData': 'True' | string;
    'FG.NetworkQuality': string;
  };
  pendingServerOptions: Partial<GetServerOptionsResponseBody['serverOptions']>;
};

export type GetServerOptions = {
  functionName: 'getserveroptions';
  requestType: GetServerOptionsRequestData;
  responseType: GetServerOptionsResponseBody;
};
