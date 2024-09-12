export type HealthCheckRequestBody = {
  clientCustomData: string;
};

export type HealthCheckResponseBody = {
  health: 'healthy' | 'slow';
  serverCustomData: string;
};
