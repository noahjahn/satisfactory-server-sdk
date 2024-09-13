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

  getDefaultData(apiFunction: ValidApiFunctions) {
    if (apiFunction === ApiFunctions.HealthCheck)
      return {
        clientCustomData: '',
      } as HealthCheckRequestData;

    // TODO: maybe this should be a not implemented error, since apiFunction could be valid but doesn't have any default data
    throw new Error(`Unknown API Function: ${apiFunction}`);
  }

  execute(apiFunction: ValidApiFunctions, data?: ValidRequestData) {
    if (data === undefined) {
      data = this.getDefaultData(apiFunction);
    }

    return this.client.request({
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
