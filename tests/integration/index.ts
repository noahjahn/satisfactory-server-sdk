import SatisfactoryServer from '../..';

const satisfactory = new SatisfactoryServer(
  'https://satisfactory.noahjahn.dev'
);

const result = await satisfactory.execute('healthcheck');

console.log(result);
