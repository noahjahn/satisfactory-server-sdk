import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk-test';
import type {
  HealthCheckRequestData,
  HealthCheckResponseBody,
} from '@noahjahn/satisfactory-server-sdk-test';

const satisfactory = new SatisfactoryServer(`https://satisfactory.nobey.net`);

const healthcheck = await satisfactory.execute<
  HealthCheckRequestData,
  HealthCheckResponseBody
>('healthcheck');

console.log(healthcheck.data.health);
