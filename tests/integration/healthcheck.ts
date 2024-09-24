import { expect } from 'chai';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { test } from './index.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';

async function runTests(satisfactoryServer: SatisfactoryServer) {
  const healthcheck = await satisfactoryServer.execute('healthcheck');

  assertBasicResponseStructure(healthcheck);
  test("The healthcheck's data object has the health property", () => {
    expect(healthcheck.data).to.have.property('health');
  });
  test("The healthcheck's data object's health property is a string", () => {
    expect(healthcheck.data.health).to.be.a('string');
  });
  test("The healthcheck's data object's health property is equal to healthy", () => {
    expect(healthcheck.data.health).to.equal('healthy');
  });
}

async function execute() {
  logger.log('Testing Health Check...');

  logger.log('Testing insecure option...');
  const satisfactoryInsecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}:7777`,
    {
      insecure: true,
    },
  );
  await runTests(satisfactoryInsecure);

  logger.log('Testing secure connection...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await runTests(satisfactorySecure);
  logger.log('Health Check testing complete.');

  // TODO: how to test for slow?
  // TODO: how to test for not healthy?
}

export default execute;
