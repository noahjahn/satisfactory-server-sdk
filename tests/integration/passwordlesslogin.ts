import { expect } from 'chai';
import type {
  PasswordlessLoginResponseBody,
  PasswordlessLoginResponseErrorData,
} from '../../src/functions/passwordless-login/index.js';
import { PrivilegeLevels, type ResponseBody } from '../../src/index.js';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { test } from './index.js';
import assertBasicHttpError from './helpers/assert-basic-http-error.js';
import assertBasicResponseStructure from './helpers/assert-basic-response-structure.js';
import createSatisfactoryServerSdk from './helpers/create-satisfactory-server-sdk.js';
import { HttpError } from '../../src/http-client.js';

// function assertInstanceOfPasswordlessLoginError(error: unknown) {
//   test('The error response object is and instance of HttpError with the PasswordlessLoginResponseErrorData data object', () => {
//     expect(error).to.be.an.instanceof(
//       HttpError<PasswordlessLoginResponseErrorData>,
//     );
//   });
// }

function assertBasicPasswordlessLoginError(
  passwordLoginError: HttpError<PasswordlessLoginResponseErrorData>,
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
  passwordlesslogin: ResponseBody<PasswordlessLoginResponseBody>,
) {
  assertBasicResponseStructure(passwordlesslogin);
  test("The passwordlesslogin's data object has the authenticationToken property", () => {
    expect(passwordlesslogin.data).to.have.property('authenticationToken');
  });
  test("The passwordlesslogin's data object's authenticationToken property is a string", () => {
    expect(passwordlesslogin.data.authenticationToken).to.be.a('string');
  });
}

async function testWithOutSendingAnyData(
  satisfactoryServer: SatisfactoryServer,
) {
  try {
    await satisfactoryServer.execute('passwordlesslogin');
    test('Throws and error in the case a somehow the passwordlesslogin without sending data works and gets this far', () => {
      throw new Error(
        'password login without sending any data should have failed',
      );
    });
  } catch (error) {
    // assertInstanceOfPasswordLoginError(error);
    if (error instanceof HttpError) {
      const passwordlessLoginError =
        error as HttpError<PasswordlessLoginResponseErrorData>;

      assertBasicPasswordlessLoginError(passwordlessLoginError);

      test("The error response object's body property's errorCode property equals missing_params", () => {
        // TODO: can we make the error code here typed to the function?
        expect(passwordlessLoginError.body.errorCode).to.equal(
          'missing_params',
        );
      });

      test("The error response object's body property has the errorData property", () => {
        expect(passwordlessLoginError.body).to.have.property('errorData');
      });
      test("The error response object's body property's errorData property is an object", () => {
        expect(passwordlessLoginError.body.errorData).to.be.an('object');
      });

      test("The error response object's body property's errorData property has the missingParameters property", () => {
        expect(passwordlessLoginError.body.errorData).to.have.property(
          'missingParameters',
        );
      });
      test("The error response object's body property's errorData property's missingParameters property is an array", () => {
        expect(
          passwordlessLoginError.body.errorData?.missingParameters,
        ).to.be.an('array');
      });
      test("The error response object's body property's errorData property's missingParameters property includes minimumPrivilegeLevel", () => {
        expect(
          passwordlessLoginError.body.errorData?.missingParameters,
        ).to.include('minimumPrivilegeLevel');
      });

      test("The error response object's body property's errorData property has the invalidParameters property", () => {
        expect(passwordlessLoginError.body.errorData).to.have.property(
          'invalidParameters',
        );
      });
      test("The error response object's body property's errorData property's invalidParameters property is an object", () => {
        expect(
          passwordlessLoginError.body.errorData?.invalidParameters,
        ).to.be.an('object');
      });
    }
  }
}

async function runTests(satisfactoryServer: SatisfactoryServer) {
  const passwordlesslogin = await satisfactoryServer.execute(
    'passwordlesslogin',
    {
      minimumPrivilegeLevel: PrivilegeLevels.InitialAdmin,
    },
  );

  testWithOutSendingAnyData(satisfactoryServer);
  assertSuccessfulLogin(passwordlesslogin);
}

async function execute() {
  logger.log('Testing Passwordless login...');
  const satisfactoryServer = createSatisfactoryServerSdk();
  await runTests(satisfactoryServer);
  logger.log('Passwordless login testing complete.');
}

export default execute;
