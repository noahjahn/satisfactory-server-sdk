import logger from '../../src/logger/index.js';
import executeHealthCheckTests from './healthcheck.js';

// TODO: should probably use mocha instead
function assertAndLog(assertion: Function) {
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
