import type {
  IHttpClient,
  ResponseBody,
  RequestOptions,
} from './http-client.js';
import Client from './http-client.js';
import logger from './logger/index.js';
import type { HealthCheckRequestData } from './functions/health-check/index.js';
import { validateUrl } from './helpers/validate-url.js';
import type { PasswordLoginResponseBody } from './functions/password-login/index.js';

export enum ApiFunctions {
  HealthCheck = 'healthcheck',
  QueryServerState = 'queryserverstate',
  PasswordLogin = 'passwordlogin',
}

export type ValidApiFunctions =
  | 'healthcheck'
  | 'queryserverstate'
  | 'passwordlogin';

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

  protected bearerToken: string | undefined;

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

  async execute<RequestT, ResponseT>(
    apiFunction: ValidApiFunctions,
    data?: RequestT | null,
  ) {
    if (data === undefined) {
      data = this.getDefaultData<RequestT>(apiFunction);
    }

    const requestOptions = {
      method: 'post',
      path: '/api/v1',
      body: {
        function: apiFunction,
        data,
      },
    } as RequestOptions<RequestT>;

    if (this.bearerToken !== undefined) {
      requestOptions.headers = {
        Authorization: `Bearer ${this.bearerToken}`,
      };
    }

    const responseBody = this.client.request<RequestT, ResponseT>(
      requestOptions,
    );

    if (apiFunction === ApiFunctions.PasswordLogin) {
      this.bearerToken = (
        (await responseBody) as ResponseBody<PasswordLoginResponseBody>
      ).data.authenticationToken;
    }

    return responseBody;
  }
}

export default SatisfactoryServer;
