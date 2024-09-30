export type RunCommandRequestResponseBody = {
  commandResult: string;
};

export type RunCommandRequestData = {
  command: string;
};

export type RunCommand = {
  functionName: 'runcommand';
  requestType: RunCommandRequestData;
  responseType: RunCommandRequestResponseBody;
};
