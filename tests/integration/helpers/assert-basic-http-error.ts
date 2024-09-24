import { expect } from 'chai';
import { Response } from 'node-fetch';
import { test } from '../index.js';
import type { HttpError } from '../../../src/http-client.js';

export default function assertBasicHttpError(error: HttpError<unknown>) {
  test('An error occurred', () => {
    expect(error).to.be.an('error');
  });

  test('The error has the response property', () => {
    expect(error).to.have.property('response');
  });
  test('The error response property is an instance of the Node fetch Response object', () => {
    expect(error.response).to.be.an.instanceof(Response);
  });
  test('The error response object has the status property', () => {
    expect(error.response).to.have.property('status');
  });
  test("The error response object's status property is 200", () => {
    expect(error.response.status).to.equal(200);
  });

  test('The error has the body property', () => {
    expect(error).to.have.property('body');
  });
  test('The error body property is an object', () => {
    expect(error.body).to.be.an('object');
  });

  test('The error body object has the errorCode property', () => {
    expect(error.body).to.have.property('errorCode');
  });
  test("The error body object's errorCode property is a string", () => {
    expect(error.body.errorCode).to.be.a('string');
  });
}
