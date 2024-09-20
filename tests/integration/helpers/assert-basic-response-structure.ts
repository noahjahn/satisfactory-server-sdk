import { expect } from 'chai';
import { assertAndLog } from '../index.js';
import type { ResponseBody } from '../../../src/http-client.js';

export default function assertBasicResponseStructure(
  responseBody: ResponseBody<unknown>,
) {
  assertAndLog('The response body is an object', () => {
    expect(responseBody).to.be.an('object');
  });
  assertAndLog('The response body has the data property', () => {
    expect(responseBody).to.have.property('data');
  });
  assertAndLog('The response body data property is an object', () => {
    expect(responseBody.data).to.be.an('object');
  });
}
