import fetch from 'node-fetch';
import type { RequestInit } from 'node-fetch';
import { Agent } from 'https';

import type { ValidApiFunctions } from './index.js';
import type { HealthCheckRequestData } from './functions/health-check/index.js';

export type ValidRequestBody = {
  function: ValidApiFunctions;
  data: HealthCheckRequestData;
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
  agent: Agent;

  constructor(
    baseUrl: string,
    insecure: boolean = false,
    headers?: RequestInit['headers'],
  ) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
    this.agent = new Agent({
      rejectUnauthorized: !insecure,
    });
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
      agent: this.agent,
    });
  }
}
