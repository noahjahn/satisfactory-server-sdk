# satisfactory-server-sdk

Satisfactory Dedicated Server "TypeScript first" JavaScript HTTP API SDK docs

## Installation

```shell
npm i @noahjahn/satisfactory-server-sdk
```

## Usage

### TypeScript

```typescript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk';

const satisfactory = new SatisfactoryServer(
  process.env.SATISFACTORY_SERVER_BASE_URL,
);

const healthcheck = await satisfactory.execute('healthcheck');
console.log(healthcheck.data.health);
```

### JavaScript ESM

```javascript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk';

const satisfactory = new SatisfactoryServer(
  process.env.SATISFACTORY_SERVER_BASE_URL,
);

const healthcheck = await satisfactory.execute('healthcheck');
console.log(healthcheck.data.health);
```
