import { expect } from 'chai';
import { Response } from 'node-fetch';
import {
  type PasswordLoginRequestData,
  type PasswordLoginResponseBody,
  type PasswordLoginResponseErrorData,
} from '../../src/functions/password-login/index.js';
import { HttpError } from '../../src/http-client.js';
import SatisfactoryServer from '../../src/index.js';
import logger from '../../src/logger/index.js';
import { assertAndLog } from './index.js';

async function testWithOutSendingAnyData(
  satisfactoryServer: SatisfactoryServer,
) {
  try {
    await satisfactoryServer.execute('passwordlogin');
    assertAndLog(() => {
      throw new Error(
        'password login without sending any data should have failed',
      );
    });
  } catch (error) {
    assertAndLog(() => {
      expect(error).to.be.an.instanceof(
        HttpError<PasswordLoginResponseErrorData>,
      );
    });
    if (error instanceof HttpError) {
      const passwordLoginError =
        error as HttpError<PasswordLoginResponseErrorData>;
      assertAndLog(() => {
        expect(passwordLoginError).to.be.an('error');
      });

      assertAndLog(() => {
        expect(passwordLoginError).to.have.property('response');
      });
      assertAndLog(() => {
        expect(passwordLoginError.response).to.be.an.instanceof(Response);
      });
      assertAndLog(() => {
        expect(passwordLoginError.response).to.have.property('status');
      });
      assertAndLog(() => {
        expect(passwordLoginError.response.status).to.equal(200);
      });

      assertAndLog(() => {
        expect(passwordLoginError).to.have.property('body');
      });
      assertAndLog(() => {
        expect(passwordLoginError.body).to.be.an('object');
      });

      assertAndLog(() => {
        expect(passwordLoginError.body).to.have.property('errorCode');
      });
      assertAndLog(() => {
        expect(passwordLoginError.body.errorCode).to.be.a('string');
      });
      assertAndLog(() => {
        expect(passwordLoginError.body.errorCode).to.equal('missing_params');
      });

      assertAndLog(() => {
        expect(passwordLoginError.body).to.have.property('errorMessage');
      });
      assertAndLog(() => {
        expect(passwordLoginError.body.errorMessage).to.be.a('string');
      });

      assertAndLog(() => {
        expect(passwordLoginError.body).to.have.property('errorData');
      });
      assertAndLog(() => {
        expect(passwordLoginError.body.errorData).to.be.an('object');
      });

      assertAndLog(() => {
        expect(passwordLoginError.body.errorData).to.have.property(
          'missingParameters',
        );
      });
      assertAndLog(() => {
        expect(passwordLoginError.body.errorData?.missingParameters).to.be.an(
          'array',
        );
      });
      assertAndLog(() => {
        expect(passwordLoginError.body.errorData?.missingParameters)
          .to.include('password')
          .and.include('minimumPrivilegeLevel');
      });

      assertAndLog(() => {
        expect(passwordLoginError.body.errorData).to.have.property(
          'invalidParameters',
        );
      });
      assertAndLog(() => {
        expect(passwordLoginError.body.errorData?.invalidParameters).to.be.an(
          'object',
        );
      });
    }
  }
}

async function testWithValidCredentials(
  satisfactoryServer: SatisfactoryServer,
) {
  if (!process.env.SATISFACTORY_ADMINISTRATOR_PASSWORD) {
    throw new Error(
      'Please set the SATISFACTORY_ADMINISTRATOR_PASSWORD environment variable',
    );
  }
  const passwordlogin = await satisfactoryServer.execute<
    PasswordLoginRequestData,
    PasswordLoginResponseBody
  >('passwordlogin', {
    minimumPrivilegeLevel: 'administrator',
    password: process.env.SATISFACTORY_ADMINISTRATOR_PASSWORD,
  });

  logger.log(passwordlogin.data.authenticationToken);
}

async function test(satisfactoryServer: SatisfactoryServer) {
  await testWithOutSendingAnyData(satisfactoryServer);
  await testWithValidCredentials(satisfactoryServer);
}

async function execute() {
  // TODO: accept integration URLs as args to the script

  logger.log('Testing Password login...');
  const satisfactorySecure = new SatisfactoryServer(
    `https://${process.env.SATISFACTORY_SERVER_BASE_URL}`,
  );

  await test(satisfactorySecure);
  logger.log('Password login testing complete.');
}

export default execute;
