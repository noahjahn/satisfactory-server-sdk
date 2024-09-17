import { expect } from 'chai';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { assertAndLog } from './index.js';
import {
  type HealthCheckRequestData,
  type HealthCheckResponseBody,
} from '../../src/functions/health-check/index.js';

async function test(satisfactoryServer: SatisfactoryServer) {
  const healthcheck = await satisfactoryServer.execute<
    HealthCheckRequestData,
    HealthCheckResponseBody
  >('healthcheck');

  assertAndLog(() => {
    expect(healthcheck).to.be.an('object');
  });
  assertAndLog(() => {
    expect(healthcheck).to.have.property('data');
  });
  assertAndLog(() => {
    expect(healthcheck.data).to.be.an('object');
  });
  assertAndLog(() => {
    expect(healthcheck.data).to.have.property('health');
  });
  assertAndLog(() => {
    expect(healthcheck.data.health).to.be.a('string');
  });
  assertAndLog(() => {
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
  await test(satisfactoryInsecure);

  logger.log('Testing secure connection...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await test(satisfactorySecure);
  logger.log('Health Check testing complete.');
}

export default execute;
