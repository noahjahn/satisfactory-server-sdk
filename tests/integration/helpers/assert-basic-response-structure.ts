import { expect } from 'chai';
import { test } from '../index.js';
import type { ResponseBody } from '../../../src/http-client.js';

export default function assertBasicResponseStructure(
  responseBody: ResponseBody<unknown>,
) {
  test('The response body is an object', () => {
    expect(responseBody).to.be.an('object');
  });
  test('The response body has the data property', () => {
    expect(responseBody).to.have.property('data');
  });
  test('The response body data property is an object', () => {
    expect(responseBody.data).to.be.an('object');
  });
}
