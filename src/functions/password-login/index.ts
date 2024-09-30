import type { ValidPrivilegeLevels } from '../../index.js';

export type PasswordLoginRequestData = {
  minimumPrivilegeLevel: ValidPrivilegeLevels;
  password: string;
};

export type PasswordLoginResponseBody = {
  authenticationToken: string;
};

export type PasswordLoginResponseErrorData = {
  missingParameters: Array<string>;
  invalidParameters: {};
};

export enum PasswordLoginErrorCodes {
  WRONG_PASSWORD = 'wrong_password',
}

export type PasswordLogin = {
  functionName: 'passwordlogin';
  requestType: PasswordLoginRequestData;
  responseType: PasswordLoginResponseBody;
};
