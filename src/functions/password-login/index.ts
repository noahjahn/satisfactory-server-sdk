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
