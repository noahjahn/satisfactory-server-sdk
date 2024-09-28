import { expect } from 'chai';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { test } from './index.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';
import loginAdministrator from './helpers/login-administrator.js';

async function runTests(satisfactoryServer: SatisfactoryServer) {
  await loginAdministrator(satisfactoryServer);
  const commandResult = await satisfactoryServer.execute('runcommand', {
    command: 'test',
  });

  assertBasicResponseStructure(commandResult);
  console.log(JSON.stringify(commandResult));
  test("The runcommand's data object has the commandResult property", () => {
    expect(commandResult.data).to.have.property('commandResult');
  });

  test("The runcommand's data object has the commandResult property", () => {
    expect(commandResult.data.commandResult).to.be.a('string');
  });
}

async function execute() {
  logger.log('Testing Run Command...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await runTests(satisfactorySecure);
  logger.log('Run Command testing complete.');
}

export default execute;
