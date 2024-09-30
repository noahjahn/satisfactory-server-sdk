import type { ValidPrivilegeLevels } from '../../index.js';

export type PasswordlessLoginRequestData = {
  minimumPrivilegeLevel: ValidPrivilegeLevels;
};

export type PasswordlessLoginResponseBody = {
  authenticationToken: string;
};

export type PasswordlessLoginResponseErrorData = {
  missingParameters: Array<string>;
  invalidParameters: {};
};

export enum PasswordlessLoginErrorCodes {
  PASSWORDLESS_LOGIN_NOT_POSSIBLE = 'passwordless_login_not_possible',
}

export type PasswordlessLogin = {
  functionName: 'passwordlesslogin';
  requestType: PasswordlessLoginRequestData;
  responseType: PasswordlessLoginResponseBody;
};
