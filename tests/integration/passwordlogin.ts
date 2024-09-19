import { expect } from 'chai';
import { type PasswordLoginResponseErrorData } from '../../src/functions/password-login/index.js';
import { HttpError } from '../../src/http-client.js';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { assertAndLog } from './index.js';
import loginAdministrator from './helpers/login-administrator.js';
import assertBasicHttpError from './helpers/assert-basic-http-error.js';

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

async function testWithValidCredentials(
  satisfactoryServer: SatisfactoryServer,
) {
  await loginAdministrator(satisfactoryServer);
  // TODO: assert
}

async function test(satisfactoryServer: SatisfactoryServer) {
  await testWithOutSendingAnyData(satisfactoryServer);
  await testWithValidCredentials(satisfactoryServer);
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
