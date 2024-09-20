import type {
  PasswordLoginRequestData,
  PasswordLoginResponseBody,
} from '../../../src/functions/password-login/index.js';
import type SatisfactoryServer from '../../../src/index.js';

export default function loginClient(satisfactoryServer: SatisfactoryServer) {
  if (!process.env.SATISFACTORY_CLIENT_PASSWORD) {
    throw new Error(
      'Please set the SATISFACTORY_CLIENT_PASSWORD environment variable',
    );
  }

  return satisfactoryServer.execute<
    PasswordLoginRequestData,
    PasswordLoginResponseBody
  >('passwordlogin', {
    minimumPrivilegeLevel: 'client',
    password: process.env.SATISFACTORY_CLIENT_PASSWORD,
  });
}
