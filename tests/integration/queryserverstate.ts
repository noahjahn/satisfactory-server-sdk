import type { QueryServerStateResponseBody } from '../../src/functions/query-server-state/index.js';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import loginAdministrator from './helpers/login-administrator.js';

async function test(satisfactoryServer: SatisfactoryServer) {
  await loginAdministrator(satisfactoryServer);
  const queryServerState = await satisfactoryServer.execute<
    undefined,
    QueryServerStateResponseBody
  >('queryserverstate');
  logger.debug(queryServerState.data.serverGameState.activeSessionName);
}

async function execute() {
  logger.log('Testing Query server state...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await test(satisfactorySecure);
  logger.log('Query server state testing complete.');
}

export default execute;
