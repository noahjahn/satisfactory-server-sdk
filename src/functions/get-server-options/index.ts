export type GetServerOptionsRequestData = undefined;

export type GetServerOptionsResponseBody = {
  serverOptions: Record<string, string> &
    Partial<{
      'FG.DSAutoPause': 'False' | 'True' | string;
      'FG.DSAutoSaveOnDisconnect': 'False' | 'True' | string;
      'FG.AutosaveInterval': string;
      'FG.ServerRestartTimeSlot': string;
      'FG.SendGameplayData': 'False' | 'True' | string;
      'FG.NetworkQuality': string;
    }>;
  pendingServerOptions: Partial<GetServerOptionsResponseBody['serverOptions']>;
};

export type GetServerOptions = {
  functionName: 'getserveroptions';
  requestType: GetServerOptionsRequestData;
  responseType: GetServerOptionsResponseBody;
};
