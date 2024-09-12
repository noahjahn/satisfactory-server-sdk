import type { IHttpClient } from './http-client';
import Client from './http-client';

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

class SatisfactoryServer {
  protected baseUrl: string;
  client: IHttpClient;

  constructor(baseUrl: string) {
    // TODO: check if baseUrl has `/api/v1` at the end or not, throw an error if it does
    // TODO: probably should trim any trailing slashes
    // TODO: validate the URL too maybe
    this.baseUrl = `${baseUrl}`;
    this.client = new Client(this.baseUrl);
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
