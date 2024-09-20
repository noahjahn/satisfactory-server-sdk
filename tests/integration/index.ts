import 'dotenv/config';
import logger from '../../src/logger/index.js';
import executeHealthCheckTests from './healthcheck.js';
import executePasswordLoginTests from './passwordlogin.js';

// TODO: should probably use mocha instead
function assertAndLog(message: string, assertion: Function) {
  logger.log(message);
  try {
    assertion();
    logger.success('Assertion passed');
  } catch (error) {
    logger.error('Assertion failed');
    console.error(error);
  }
}

export { assertAndLog };

await executeHealthCheckTests();
await executePasswordLoginTests();
