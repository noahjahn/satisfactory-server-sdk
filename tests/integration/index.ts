import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import type {
  HealthCheckRequestData,
  HealthCheckResponseBody,
} from '../../src/functions/health-check/index.js';

// TODO: accept integration URLs as args to the script

const satisfactoryInsecure = new SatisfactoryServer(
  'https://satisfactory.nobey.net:7777',
  {
    insecure: true,
  },
);

const insecureResult = await satisfactoryInsecure.execute<
  HealthCheckRequestData,
  HealthCheckResponseBody
>('healthcheck');

logger.debug(insecureResult.data);

const satisfactorySecure = new SatisfactoryServer(
  'https://satisfactory.nobey.net',
);

const secureResult = await satisfactorySecure.execute<
  HealthCheckRequestData,
  HealthCheckResponseBody
>('healthcheck');

logger.log('----\n');

logger.debug(secureResult.data);
