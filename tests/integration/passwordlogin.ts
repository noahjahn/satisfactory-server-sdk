import { expect } from 'chai';
import {
  type PasswordLoginRequestData,
  type PasswordLoginResponseBody,
  type PasswordLoginResponseErrorData,
} from '../../src/functions/password-login/index.js';
import { HttpError } from '../../src/http-client.js';
import type { ResponseBody } from '../../src/http-client.js';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { assertAndLog } from './index.js';
import loginAdministrator from './helpers/login-administrator.js';
import loginClient from './helpers/login-client.js';
import assertBasicHttpError from './helpers/assert-basic-http-error.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';

function assertInstanceOfPasswordLoginError(error: unknown) {
  assertAndLog(
    'The error response object is and instance of HttpError with the PasswordLoginResponseErrorData data object',
    () => {
      expect(error).to.be.an.instanceof(
        HttpError<PasswordLoginResponseErrorData>,
      );
    },
  );
}

function assertBasicPasswordLoginError(
  passwordLoginError: HttpError<PasswordLoginResponseErrorData>,
) {
  assertBasicHttpError(passwordLoginError);

  assertAndLog(
    "The error response object's body property has the errorMessage property",
    () => {
      expect(passwordLoginError.body).to.have.property('errorMessage');
    },
  );
  assertAndLog(
    "The error response object's body property's errorMessage property is a string",
    () => {
      expect(passwordLoginError.body.errorMessage).to.be.a('string');
    },
  );
}

function assertSuccessfulLogin(
  passwordLogin: ResponseBody<PasswordLoginResponseBody>,
) {
  assertBasicResponseStructure(passwordLogin);
  assertAndLog(
    "The passwordlogin's data object has the authenticationToken property",
    () => {
      expect(passwordLogin.data).to.have.property('authenticationToken');
    },
  );
  assertAndLog(
    "The passwordlogin's data object's authenticationToken property is a string",
    () => {
      expect(passwordLogin.data.authenticationToken).to.be.a('string');
    },
  );
}

async function testWithOutSendingAnyData(
  satisfactoryServer: SatisfactoryServer,
) {
  try {
    await satisfactoryServer.execute('passwordlogin');
    assertAndLog(
      'Throws and error in the case a somehow the passwordlogin without sending data works and gets this far',
      () => {
        throw new Error(
          'password login without sending any data should have failed',
        );
      },
    );
  } catch (error) {
    assertInstanceOfPasswordLoginError(error);
    if (error instanceof HttpError) {
      const passwordLoginError =
        error as HttpError<PasswordLoginResponseErrorData>;

      assertBasicPasswordLoginError(passwordLoginError);

      assertAndLog(
        "The error response object's body property's errorCode property equals missing_params",
        () => {
          // TODO: can we make the error code here typed to the function?
          expect(passwordLoginError.body.errorCode).to.equal('missing_params');
        },
      );

      assertAndLog(
        "The error response object's body property has the errorData property",
        () => {
          expect(passwordLoginError.body).to.have.property('errorData');
        },
      );
      assertAndLog(
        "The error response object's body property's errorData property is an object",
        () => {
          expect(passwordLoginError.body.errorData).to.be.an('object');
        },
      );

      assertAndLog(
        "The error response object's body property's errorData property has the missingParameters property",
        () => {
          expect(passwordLoginError.body.errorData).to.have.property(
            'missingParameters',
          );
        },
      );
      assertAndLog(
        "The error response object's body property's errorData property's missingParameters property is an array",
        () => {
          expect(passwordLoginError.body.errorData?.missingParameters).to.be.an(
            'array',
          );
        },
      );
      assertAndLog(
        "The error response object's body property's errorData property's missingParameters property includes password and minimumPrivilegeLevel",
        () => {
          expect(passwordLoginError.body.errorData?.missingParameters)
            .to.include('password')
            .and.include('minimumPrivilegeLevel');
        },
      );

      assertAndLog(
        "The error response object's body property's errorData property has the invalidParameters property",
        () => {
          expect(passwordLoginError.body.errorData).to.have.property(
            'invalidParameters',
          );
        },
      );
      assertAndLog(
        "The error response object's body property's errorData property's invalidParameters property is an object",
        () => {
          expect(passwordLoginError.body.errorData?.invalidParameters).to.be.an(
            'object',
          );
        },
      );
    }
  }
}

async function testWithInvalidCredentials(
  satisfactoryServer: SatisfactoryServer,
) {
  try {
    await satisfactoryServer.execute<PasswordLoginRequestData, unknown>(
      'passwordlogin',
      {
        minimumPrivilegeLevel: 'administrator',
        password: 'invalid',
      },
    );
    assertAndLog(
      'Throws and error in the case a somehow the passwordlogin with invalid credentialsgets this far',
      () => {
        throw new Error(
          'password login without sending any data should have failed',
        );
      },
    );
  } catch (error) {
    assertInstanceOfPasswordLoginError(error);
    if (error instanceof HttpError) {
      const passwordLoginError =
        error as HttpError<PasswordLoginResponseErrorData>;

      assertBasicPasswordLoginError(passwordLoginError);

      assertAndLog(
        "The error response object's body property's errorCode property equals wrong_password",
        () => {
          // TODO: can we make the error code here typed to the function?
          expect(passwordLoginError.body.errorCode).to.equal('wrong_password');
        },
      );

      assertAndLog(
        "The error response object's body property does NOT have the errorData property",
        () => {
          expect(passwordLoginError.body).to.not.have.a.property('errorData');
        },
      );
    }
  }
}

async function testWithValidAdministratorCredentials(
  satisfactoryServer: SatisfactoryServer,
) {
  const passwordloginAdministrator = await loginAdministrator(
    satisfactoryServer,
  );
  assertSuccessfulLogin(passwordloginAdministrator);
}

async function testWithValidClientCredentials(
  satisfactoryServer: SatisfactoryServer,
) {
  const passwordloginClient = await loginClient(satisfactoryServer);
  assertSuccessfulLogin(passwordloginClient);
}

async function test(satisfactoryServer: SatisfactoryServer) {
  await testWithOutSendingAnyData(satisfactoryServer);
  await testWithInvalidCredentials(satisfactoryServer);
  await testWithValidAdministratorCredentials(satisfactoryServer);
  await testWithValidClientCredentials(satisfactoryServer);
}

async function execute() {
  logger.log('Testing Password login...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await test(satisfactorySecure);
  logger.log('Password login testing complete.');
}

export default execute;
