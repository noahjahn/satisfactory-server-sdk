import type SatisfactoryServer from '../../../src/index.js';

export default function loginAdministrator(
  satisfactoryServer: SatisfactoryServer,
) {
  if (!process.env.SATISFACTORY_ADMINISTRATOR_PASSWORD) {
    throw new Error(
      'Please set the SATISFACTORY_ADMINISTRATOR_PASSWORD environment variable',
    );
  }

  return satisfactoryServer.execute('passwordlogin', {
    minimumPrivilegeLevel: 'administrator',
    password: process.env.SATISFACTORY_ADMINISTRATOR_PASSWORD,
  });
}
