export type HealthCheckRequestData = {
  clientCustomData: string;
};

export type HealthCheckResponseBody = {
  health: 'healthy' | 'slow';
  serverCustomData: string;
};

export type HealthCheck = {
  functionName: 'healthcheck';
  requestType: HealthCheckRequestData;
  responseType: HealthCheckResponseBody;
};
