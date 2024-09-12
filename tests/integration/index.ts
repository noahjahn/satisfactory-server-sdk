import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';

const satisfactory = new SatisfactoryServer(
  'https://satisfactory.nobey.net:7777',
  {
    insecure: true,
  },
);

const result = await satisfactory.execute('healthcheck');

logger.debug(result);
