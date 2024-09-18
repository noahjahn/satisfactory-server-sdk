import { expect } from 'chai';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { assertAndLog } from './index.js';
import {
  type HealthCheckRequestData,
  type HealthCheckResponseBody,
} from '../../src/functions/health-check/index.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';

async function test(satisfactoryServer: SatisfactoryServer) {
  const healthcheck = await satisfactoryServer.execute('healthcheck');

  assertBasicResponseStructure(healthcheck);
  assertAndLog("The healthcheck's data object has the health property", () => {
    expect(healthcheck.data).to.have.property('health');
  });
  assertAndLog(
    "The healthcheck's data object's health property is a string",
    () => {
      expect(healthcheck.data.health).to.be.a('string');
    },
  );
  assertAndLog(
    "The healthcheck's data object's health property is equal to healthy",
    () => {
      expect(healthcheck.data.health).to.equal('healthy');
    },
  );
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
  await test(satisfactoryInsecure);

  logger.log('Testing secure connection...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await test(satisfactorySecure);
  logger.log('Health Check testing complete.');

  // TODO: how to test for slow?
  // TODO: how to test for not healthy?
}

export default execute;
