import type { IHttpClient } from './http-client.js';
import Client from './http-client.js';
import logger from './logger/index.js';
import type { HealthCheckRequestData } from './functions/health-check/index.js';
import { validateUrl } from './helpers/validate-url.js';

export enum ApiFunctions {
  HealthCheck = 'healthcheck',
  QueryServerState = 'queryserverstate',
}

export type ValidApiFunctions = 'healthcheck' | 'queryserverstate';

export type ValidRequestData = HealthCheckRequestData;

export type ErrorResult = {
  errorCode: string;
  errorMessage?: string;
  errrorData?: unknown;
};

type SatisfactoryServerOptions = {
  insecure: boolean;
};

class SatisfactoryServer {
  protected baseUrl: string;
  client: IHttpClient;

  constructor(baseUrl: string, options?: SatisfactoryServerOptions) {
    const validUrl = validateUrl(baseUrl) as string;

    this.baseUrl = validUrl;
    if (options?.insecure) {
      logger.warn(
        "You've enabled insecure mode. The server will NOT reject unauthorized SSL certificates (like self-signed ones)",
      );
    }
    this.client = new Client(this.baseUrl, options?.insecure);
  }

  getDefaultData<T>(apiFunction: ValidApiFunctions) {
    if (apiFunction === ApiFunctions.HealthCheck)
      return {
        clientCustomData: '',
      } as T;

    return null;
  }

  execute<RequestT, ResponseT>(
    apiFunction: ValidApiFunctions,
    data?: RequestT | null,
  ) {
    if (data === undefined) {
      data = this.getDefaultData<RequestT>(apiFunction);
    }

    return this.client.request<RequestT, ResponseT>({
      method: 'post',
      path: '/api/v1',
      body: {
        function: apiFunction,
        data,
      },
    });
  }
}

export default SatisfactoryServer;
