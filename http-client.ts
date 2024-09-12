import { fetch } from 'bun';
import https from 'https';
import { Agent, setGlobalDispatcher } from 'undici';

import type { ValidApiFunctions } from '.';
import type { HealthCheckRequestBody } from './functions/health-check';

export type ValidRequestBody = {
  function: ValidApiFunctions;
  data: HealthCheckRequestBody;
};

export interface IHttpClient {
  headers: RequestInit['headers'];
  baseUrl: string;
  request: ({
    method,
    headers,
    path,
    body,
  }: {
    method: 'post';
    headers?: RequestInit['headers'];
    path: string;
    body: ValidRequestBody;
  }) => unknown;
}

export default class HttpClient implements IHttpClient {
  headers: RequestInit['headers'];
  baseUrl: string;
  agent: https.Agent;

  constructor(baseUrl: string, headers?: RequestInit['headers']) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
    this.agent = new https.Agent({
      // TODO: default this to true, but require devs to turn it off if they want to ignore SSL issues due to self-signed cert
      rejectUnauthorized: false,
    });

    const agent = new Agent({
      connect: {
        rejectUnauthorized: false,
      },
    });

    setGlobalDispatcher(agent);
  }

  request({
    method,
    headers,
    path,
    body,
  }: {
    method: 'post';
    headers?: RequestInit['headers'];
    path: string;
    body: ValidRequestBody;
  }) {
    return fetch(new URL(path, this.baseUrl).toString(), {
      method,
      headers: {
        ...this.headers,
        ...headers,
      },
      body: JSON.stringify(body),
    });
  }
}
