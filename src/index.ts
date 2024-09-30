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
import type {
  PasswordlessLogin,
  PasswordlessLoginRequestData,
  PasswordlessLoginResponseBody,
} from './functions/passwordless-login/index.js';
import type { QueryServerState } from './functions/query-server-state/index.js';
import { validateUrl } from './helpers/validate-url.js';
import type { QueryServerStateResponseBody } from './functions/query-server-state/index.js';
import type {
  GetAdvancedGameSettings,
  GetAdvancedGameSettingsRequestData,
  GetAdvancedGameSettingsResponseBody,
} from './functions/get-advanced-game-settings/index.js';
import type {
  GetServerOptions,
  GetServerOptionsRequestData,
  GetServerOptionsResponseBody,
} from './functions/get-server-options/index.js';

export enum PrivilegeLevels {
  NotAuthenticated = 'notauthenticated',
  Client = 'client',
  Administrator = 'administrator',
  InitialAdmin = 'initialadmin',
  APIToken = 'apitoken',
}

export type ValidPrivilegeLevels =
  | 'notauthenticated'
  | 'client'
  | 'administrator'
  | 'initialadmin'
  | 'apitoken';

export enum ApiFunctions {
  GetAdvancedGameSettings = 'getadvancedgamesettings',
  GetServerOptions = 'getserveroptions',
  HealthCheck = 'healthcheck',
  PasswordLogin = 'passwordlogin',
  PasswordlessLogin = 'passwordlesslogin',
  QueryServerState = 'queryserverstate',
}

export type SatisfactoryServerOptions = {
  insecure: boolean;
};

export type ValidRequest = {
  getadvancedgamesettings: GetAdvancedGameSettings;
  getserveroptions: GetServerOptions;
  healthcheck: HealthCheck;
  passwordlogin: PasswordLogin;
  passwordlesslogin: PasswordlessLogin;
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

  getDefaultData<Data>(apiFunction: keyof ValidRequest) {
    if (apiFunction === ApiFunctions.HealthCheck)
      return {
        clientCustomData: '',
      } as Data;

    return null;
  }

  async execute(
    apiFunction: 'getadvancedgamesettings',
    data?: GetAdvancedGameSettingsRequestData,
  ): Promise<{ data: GetAdvancedGameSettingsResponseBody }>;
  async execute(
    apiFunction: 'getserveroptions',
    data?: GetServerOptionsRequestData,
  ): Promise<{ data: GetServerOptionsResponseBody }>;
  async execute(
    apiFunction: 'healthcheck',
    data?: HealthCheckRequestData,
  ): Promise<{ data: HealthCheckResponseBody }>;
  async execute(
    apiFunction: 'passwordlogin',
    data?: PasswordLoginRequestData,
  ): Promise<{ data: PasswordLoginResponseBody }>;
  async execute(
    apiFunction: 'passwordlesslogin',
    data?: PasswordlessLoginRequestData,
  ): Promise<{ data: PasswordlessLoginResponseBody }>;
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
        data: data,
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

    if (
      apiFunction === ApiFunctions.PasswordLogin ||
      apiFunction === ApiFunctions.PasswordlessLogin
    ) {
      // TODO: optionally ignore setting bearer token
      this.bearerToken = (
        (await responseBody) as ResponseBody<PasswordLoginResponseBody>
      ).data.authenticationToken;
    }

    return responseBody;
  }
}

export default SatisfactoryServer;

export { SatisfactoryServer };
export * from './http-client.js';
export * as functions from './functions/index.js';
export * as helpers from './helpers/index.js';
export * as logger from './logger/index.js';
