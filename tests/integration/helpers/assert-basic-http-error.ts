import { expect } from 'chai';
import { Response } from 'node-fetch';
import { assertAndLog } from '../index.js';
import type { HttpError } from '../../../src/http-client.js';

export default function assertBasicHttpError(error: HttpError<unknown>) {
  assertAndLog('An error occurred', () => {
    expect(error).to.be.an('error');
  });

  assertAndLog('The error has the response property', () => {
    expect(error).to.have.property('response');
  });
  assertAndLog(
    'The error response property is an instance of the Node fetch Response object',
    () => {
      expect(error.response).to.be.an.instanceof(Response);
    },
  );
  assertAndLog('The error response object has the status property', () => {
    expect(error.response).to.have.property('status');
  });
  assertAndLog("The error response object's status property is 200", () => {
    expect(error.response.status).to.equal(200);
  });

  assertAndLog('The error has the body property', () => {
    expect(error).to.have.property('body');
  });
  assertAndLog('The error body property is an object', () => {
    expect(error.body).to.be.an('object');
  });

  assertAndLog('The error body object has the errorCode property', () => {
    expect(error.body).to.have.property('errorCode');
  });
  assertAndLog("The error body object's errorCode property is a string", () => {
    expect(error.body.errorCode).to.be.a('string');
  });
}
