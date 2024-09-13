export type HealthCheckRequestData = {
  clientCustomData: string;
};

export type HealthCheckResponseBody = {
  health: 'healthy' | 'slow';
  serverCustomData: string;
};
