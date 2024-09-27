import { expect } from 'chai';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { test } from './index.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';
import loginAdministrator from './helpers/login-administrator.js';

async function runTests(satisfactoryServer: SatisfactoryServer) {
  await loginAdministrator(satisfactoryServer);
  const serveroptions = await satisfactoryServer.execute('getserveroptions');

  assertBasicResponseStructure(serveroptions);

  test("The getserveroptions's data object has the serverOptions property", () => {
    expect(serveroptions.data).to.have.property('serverOptions');
  });

  test("The getserveroptions's data object has the pendingServerOptions property", () => {
    expect(serveroptions.data).to.have.property('pendingServerOptions');
  });
}

async function execute() {
  logger.log('Testing Get Server Options...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await runTests(satisfactorySecure);
  logger.log('Get Server Options testing complete.');
}

export default execute;
