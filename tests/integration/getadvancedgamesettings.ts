import { expect } from 'chai';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { test } from './index.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';
import loginAdministrator from './helpers/login-administrator.js';

async function runTests(satisfactoryServer: SatisfactoryServer) {
  await loginAdministrator(satisfactoryServer);
  const advancedgamesettings = await satisfactoryServer.execute(
    'getadvancedgamesettings',
  );

  assertBasicResponseStructure(advancedgamesettings);

  test("The getserveroptions's data object has the creativeModeEnabled property", () => {
    expect(advancedgamesettings.data).to.have.property('creativeModeEnabled');
    expect(advancedgamesettings.data.creativeModeEnabled).to.be.a('boolean');
  });

  test("The getserveroptions's data object has the advancedGameSettings property", () => {
    expect(advancedgamesettings.data).to.have.property('advancedGameSettings');
    expect(advancedgamesettings.data.advancedGameSettings).to.be.a('object');
  });
}

async function execute() {
  logger.log('Testing Get Advanced Game Settings...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await runTests(satisfactorySecure);
  logger.log('Get Advanced Game Settings testing complete.');
}

export default execute;
