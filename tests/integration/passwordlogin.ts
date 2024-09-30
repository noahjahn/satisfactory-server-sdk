import { expect } from 'chai';
import {
  type PasswordLoginResponseBody,
  type PasswordLoginResponseErrorData,
} from '../../src/functions/password-login/index.js';
import { PrivilegeLevels } from '../../src/index.js';
import { HttpError } from '../../src/http-client.js';
import type { ResponseBody } from '../../src/http-client.js';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { test } from './index.js';
import loginAdministrator from './helpers/login-administrator.js';
import loginClient from './helpers/login-client.js';
import assertBasicHttpError from './helpers/assert-basic-http-error.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';

function assertInstanceOfPasswordLoginError(error: unknown) {
  test('The error response object is and instance of HttpError with the PasswordLoginResponseErrorData data object', () => {
    expect(error).to.be.an.instanceof(
      HttpError<PasswordLoginResponseErrorData>,
    );
  });
}

function assertBasicPasswordLoginError(
  passwordLoginError: HttpError<PasswordLoginResponseErrorData>,
) {
  assertBasicHttpError(passwordLoginError);

  test("The error response object's body property has the errorMessage property", () => {
    expect(passwordLoginError.body).to.have.property('errorMessage');
  });
  test("The error response object's body property's errorMessage property is a string", () => {
    expect(passwordLoginError.body.errorMessage).to.be.a('string');
  });
}

function assertSuccessfulLogin(
  passwordLogin: ResponseBody<PasswordLoginResponseBody>,
) {
  assertBasicResponseStructure(passwordLogin);
  test("The passwordlogin's data object has the authenticationToken property", () => {
    expect(passwordLogin.data).to.have.property('authenticationToken');
  });
  test("The passwordlogin's data object's authenticationToken property is a string", () => {
    expect(passwordLogin.data.authenticationToken).to.be.a('string');
  });
}

async function testWithOutSendingAnyData(
  satisfactoryServer: SatisfactoryServer,
) {
  try {
    await satisfactoryServer.execute('passwordlogin');
    test('Throws and error in the case a somehow the passwordlogin without sending data works and gets this far', () => {
      throw new Error(
        'password login without sending any data should have failed',
      );
    });
  } catch (error) {
    assertInstanceOfPasswordLoginError(error);
    if (error instanceof HttpError) {
      const passwordLoginError =
        error as HttpError<PasswordLoginResponseErrorData>;

      assertBasicPasswordLoginError(passwordLoginError);

      test("The error response object's body property's errorCode property equals missing_params", () => {
        // TODO: can we make the error code here typed to the function?
        expect(passwordLoginError.body.errorCode).to.equal('missing_params');
      });

      test("The error response object's body property has the errorData property", () => {
        expect(passwordLoginError.body).to.have.property('errorData');
      });
      test("The error response object's body property's errorData property is an object", () => {
        expect(passwordLoginError.body.errorData).to.be.an('object');
      });

      test("The error response object's body property's errorData property has the missingParameters property", () => {
        expect(passwordLoginError.body.errorData).to.have.property(
          'missingParameters',
        );
      });
      test("The error response object's body property's errorData property's missingParameters property is an array", () => {
        expect(passwordLoginError.body.errorData?.missingParameters).to.be.an(
          'array',
        );
      });
      test("The error response object's body property's errorData property's missingParameters property includes password and minimumPrivilegeLevel", () => {
        expect(passwordLoginError.body.errorData?.missingParameters)
          .to.include('password')
          .and.include('minimumPrivilegeLevel');
      });

      test("The error response object's body property's errorData property has the invalidParameters property", () => {
        expect(passwordLoginError.body.errorData).to.have.property(
          'invalidParameters',
        );
      });
      test("The error response object's body property's errorData property's invalidParameters property is an object", () => {
        expect(passwordLoginError.body.errorData?.invalidParameters).to.be.an(
          'object',
        );
      });
    }
  }
}

async function testWithInvalidCredentials(
  satisfactoryServer: SatisfactoryServer,
) {
  try {
    await satisfactoryServer.execute('passwordlogin', {
      minimumPrivilegeLevel: PrivilegeLevels.Administrator,
      password: 'invalid',
    });
    test('Throws and error in the case a somehow the passwordlogin with invalid credentialsgets this far', () => {
      throw new Error(
        'password login without sending any data should have failed',
      );
    });
  } catch (error) {
    assertInstanceOfPasswordLoginError(error);
    if (error instanceof HttpError) {
      const passwordLoginError =
        error as HttpError<PasswordLoginResponseErrorData>;

      assertBasicPasswordLoginError(passwordLoginError);

      test("The error response object's body property's errorCode property equals wrong_password", () => {
        // TODO: can we make the error code here typed to the function?
        expect(passwordLoginError.body.errorCode).to.equal('wrong_password');
      });

      test("The error response object's body property does NOT have the errorData property", () => {
        expect(passwordLoginError.body).to.not.have.a.property('errorData');
      });
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

async function runTests(satisfactoryServer: SatisfactoryServer) {
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

  await runTests(satisfactorySecure);
  logger.log('Password login testing complete.');
}

export default execute;
