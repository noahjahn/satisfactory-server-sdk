import type { IHttpClient } from './http-client.js';
import Client from './http-client.js';
import logger from './logger/index.js';

export enum ApiFunctions {
  HealthCheck = 'healthcheck',
  QueryServerState = 'queryserverstate',
}

export type ValidApiFunctions = 'healthcheck' | 'queryserverstate';

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
    // TODO: check if baseUrl has `/api/v1` at the end or not, throw an error if it does
    // TODO: probably should trim any trailing slashes
    // TODO: validate the URL too maybe
    this.baseUrl = `${baseUrl}`;
    if (options?.insecure) {
      logger.warn(
        "You've enabled insecure mode. The server will NOT reject unauthorized SSL certificates (like self-signed ones)",
      );
    }
    this.client = new Client(this.baseUrl, options?.insecure);
  }

  execute(apiFunction: ValidApiFunctions) {
    return this.client.request({
      method: 'post',
      path: '/api/v1',
      body: {
        function: apiFunction,
        data: {
          clientCustomData: '',
        },
      },
    });
  }
}

export default SatisfactoryServer;
