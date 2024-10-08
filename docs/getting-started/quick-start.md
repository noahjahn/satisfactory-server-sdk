# Quick start

Learn how to install and use the SDK, with a basic example executing the `healthcheck` function and logging in to execute the `queryserverstate` function

## Installation

```shell
npm i @noahjahn/satisfactory-server-sdk
```

## Usage

### Execute healthcheck

::: code-group

```TypeScript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk';

const satisfactory = new SatisfactoryServer(
  process.env.SATISFACTORY_SERVER_BASE_URL,
);

const healthcheck = await satisfactory.execute('healthcheck');
console.log(healthcheck.data.health);
```

```JavaScript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk';

const satisfactory = new SatisfactoryServer(
  process.env.SATISFACTORY_SERVER_BASE_URL,
);

const healthcheck = await satisfactory.execute('healthcheck');
console.log(healthcheck.data.health);
```

:::

::: tip
We use the [dotenv](https://www.npmjs.com/package/dotenv) library to load our environment variables during runtime, so we're not checking in any secrets to our repository. You should do the same 🤓
:::

### Administrator passwordlogin and execute queryserverstate

::: code-group

```TypeScript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk';
import { HttpError } from '@noahjahn/satisfactory-server-sdk';
import {
  type PasswordLoginResponseErrorData,
  PrivilegeLevels,
} from '@noahjahn/satisfactory-server-sdk/functions/password-login';

const satisfactoryServer = new SatisfactoryServer(
  process.env.SATISFACTORY_SERVER_BASE_URL,
);

try {
  await satisfactoryServer.execute('passwordlogin', {
    minimumPrivilegeLevel: PrivilegeLevels.Administrator,
    password: process.env.SATISFACTORY_ADMINISTRATOR_PASSWORD,
  });

  const queryServerState = await satisfactoryServer.execute('queryserverstate');
  console.log(queryServerState);
} catch (error) {
  console.error(error);
  if (error instanceof HttpError) {
    const satisfactoryServerError = error as HttpError<
      PasswordLoginResponseErrorData | undefined
    >;
    console.error(satisfactoryServerError.body.errorCode);
  }
}

```

```JavaScript
import SatisfactoryServer from '@noahjahn/satisfactory-server-sdk';
import { HttpError } from '@noahjahn/satisfactory-server-sdk';
import {
  PrivilegeLevels,
} from '@noahjahn/satisfactory-server-sdk/functions/password-login';

const satisfactoryServer = new SatisfactoryServer(
  process.env.SATISFACTORY_SERVER_URL,
);

try {
  await satisfactoryServer.execute('passwordlogin', {
    minimumPrivilegeLevel: PrivilegeLevels.Administrator,
    password: process.env.SATISFACTORY_ADMINISTRATOR_PASSWORD,
  });

  const queryServerState = await satisfactoryServer.execute('queryserverstate');
  console.log(queryServerState);
} catch (error) {
  console.error(error);
  if (error instanceof HttpError) {
    const satisfactoryServerError = error as HttpError;
    console.error(satisfactoryServerError.body.errorCode);
  }
}
```

:::
