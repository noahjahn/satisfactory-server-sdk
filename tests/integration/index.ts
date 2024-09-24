import 'dotenv/config';
import logger from '../../src/logger/index.js';
import executeHealthCheckTests from './healthcheck.js';
import executePasswordLoginTests from './passwordlogin.js';
import executeQueryServerStateTests from './queryserverstate.js';

const testResults = {
  success: 0,
  failure: 0,
};

// TODO: should probably use vitest or mocha instead
function test(message: string, assertion: Function) {
  logger.log(message);
  try {
    assertion();
    testResults.success++;
    logger.success('Assertion passed');
  } catch (error) {
    testResults.failure++;
    logger.error('Assertion failed');
    console.error(error);
  }
}

export { test };

await executeHealthCheckTests();
await executePasswordLoginTests();
await executeQueryServerStateTests();

logger.log(`\n\nSummary:`);
logger.success(`${testResults.success} successful tests`);
if (testResults.failure === 0) {
  logger.success(`${testResults.failure} failed tests... 🚀 it!`);
  process.exit(0);
}

logger.failure(`Failed tests: ${testResults.failure}`);
process.exit(1);
