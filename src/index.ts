import type {
  IHttpClient,
  ResponseBody,
  RequestOptions,
} from './http-client.js';
import Client from './http-client.js';
import logger from './logger/index.js';
import type {
  HealthCheck,
  HealthCheckRequestData,
  HealthCheckResponseBody,
} from './functions/health-check/index.js';
import type {
  PasswordLogin,
  PasswordLoginRequestData,
  PasswordLoginResponseBody,
} from './functions/password-login/index.js';
import type { QueryServerState } from './functions/query-server-state/index.js';
import { validateUrl } from './helpers/validate-url.js';
import type { QueryServerStateResponseBody } from './functions/query-server-state/index.js';

export enum ApiFunctions {
  HealthCheck = 'healthcheck',
  PasswordLogin = 'passwordlogin',
  QueryServerState = 'queryserverstate',
}

export type ErrorResult = {
  errorCode: string;
  errorMessage?: string;
  errrorData?: unknown;
};

type SatisfactoryServerOptions = {
  insecure: boolean;
};

export type ValidRequest = {
  healthcheck: HealthCheck;
  passwordlogin: PasswordLogin;
  queryserverstate: QueryServerState;
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

  getDefaultData<T>(apiFunction: keyof ValidRequest) {
    if (apiFunction === ApiFunctions.HealthCheck)
      return {
        clientCustomData: '',
      } as T;

    return null;
  }

  async execute(
    apiFunction: 'healthcheck',
    data?: HealthCheckRequestData,
  ): Promise<{ data: HealthCheckResponseBody }>;
  async execute(
    apiFunction: 'passwordlogin',
    data?: PasswordLoginRequestData,
  ): Promise<{ data: PasswordLoginResponseBody }>;
  async execute(
    apiFunction: 'queryserverstate',
  ): Promise<{ data: QueryServerStateResponseBody }>;
  async execute(
    apiFunction: keyof ValidRequest,
    data?: ValidRequest[typeof apiFunction]['requestType'] | null,
  ): Promise<unknown> {
    if (data === undefined) {
      data =
        this.getDefaultData<ValidRequest[typeof apiFunction]['requestType']>(
          apiFunction,
        );
    }

    const requestOptions = {
      method: 'post',
      path: '/api/v1',
      body: {
        function: apiFunction,
        data: data ?? null,
      },
    } as RequestOptions<ValidRequest[typeof apiFunction]['requestType']>;

    if (this.bearerToken !== undefined) {
      requestOptions.headers = {
        Authorization: `Bearer ${this.bearerToken}`,
      };
    }

    const responseBody = this.client.request<
      ValidRequest[typeof apiFunction]['requestType'],
      ValidRequest[typeof apiFunction]['responseType']
    >(requestOptions);

    if (apiFunction === ApiFunctions.PasswordLogin) {
      this.bearerToken = (
        (await responseBody) as ResponseBody<PasswordLoginResponseBody>
      ).data.authenticationToken;
    }

    return responseBody;
  }
}

export default SatisfactoryServer;

export * from './http-client.js';
export * from './functions/index.js';
export * from './helpers/index.js';
export * from './logger/index.js';
