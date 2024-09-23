# satisfactory-server-sdk

Satisfactory Dedicated Server JS and TS HTTP API SDK

## Installation

```
npm i @noahjahn/satisfactory-server-sdk-test
```

## Usage

### TypeScript

```typescript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk-test';
import {
  type HealthCheckRequestData,
  type HealthCheckResponseBody,
} from '@noahjahn/satisfactory-server-sdk-test';

const satisfactory = new SatisfactoryServer(
  `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
);

const healthcheck = await satisfactoryServer.execute<
  HealthCheckRequestData,
  HealthCheckResponseBody
>('healthcheck');

console.log(healthcheck.data.health);
```

### JavaScript

```javascript

```
