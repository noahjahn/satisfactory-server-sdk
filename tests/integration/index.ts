import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';

// TODO: accept integration URLs as args to the script

const satisfactoryInsecure = new SatisfactoryServer(
  'https://satisfactory.nobey.net:7777',
  {
    insecure: true,
  },
);

const insecureResult = await satisfactoryInsecure.execute('healthcheck');

logger.debug(await (insecureResult as Response).json());

const satisfactorySecure = new SatisfactoryServer(
  'https://satisfactory.nobey.net',
);

const secureResult = await satisfactorySecure.execute('healthcheck');

logger.log('----\n');

logger.debug(await (secureResult as Response).json());
