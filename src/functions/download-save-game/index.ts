type ErrorData = {
  missingParameters: Array<string>;
  invalidParameters: object;
};

export type DownloadSaveGameRequestData = {
  saveName: string;
};

export type DownloadSaveGameResponseBody = {
  errorCode?: 'file_not_found' | 'missing_params' | string;
  errorData?: ErrorData;
  errorMessage?: string;
};

export type DownloadSaveGame = {
  functionName: 'downloadsavegame';
  requestType: DownloadSaveGameRequestData;
  responseType: DownloadSaveGameResponseBody;
};
