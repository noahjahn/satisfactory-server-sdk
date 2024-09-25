# satisfactory-server-sdk

Satisfactory Dedicated Server JS and TS HTTP API SDK

## Installation

```shell
npm i @noahjahn/satisfactory-server-sdk
```

## Usage

### TypeScript

```typescript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk';
import type {
  HealthCheckRequestData,
  HealthCheckResponseBody,
} from '@noahjahn/satisfactory-server-sdk';

const satisfactory = new SatisfactoryServer(
  `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
);

const healthcheck = await satisfactory.execute<
  HealthCheckRequestData,
  HealthCheckResponseBody
>('healthcheck');

console.log(healthcheck.data.health);
```

### JavaScript

```javascript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk';

const satisfactory = new SatisfactoryServer(
  `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
);

const healthcheck = await satisfactory.execute('healthcheck');

console.log(healthcheck.data.health);
```
