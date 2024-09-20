import fetch from 'node-fetch';
import type { Response } from 'node-fetch';
import type { RequestInit } from 'node-fetch';
import { Agent } from 'https';
import type { ValidApiFunctions } from './index.js';

export type ValidRequestBody<T> = {
  function: ValidApiFunctions;
  data: T | null;
};

export type ResponseBody<T> = {
  data: T;
};

export type ResponseError<T> = {
  errorCode: string; // TODO: can we make this a dynamic value based on T? For example
  errorMessage?: string;
  errorData?: T | undefined;
};

export interface IHttpError extends Error {
  response: Response;
  body: ResponseError<unknown>;
}

export class HttpError<T> extends Error implements IHttpError {
  response: Response;
  body: ResponseError<T>;
  constructor({
    response,
    body,
  }: {
    response: Response;
    body: ResponseError<T>;
  }) {
    super(body.errorMessage ? body.errorMessage : body.errorCode);
    this.response = response;
    this.body = body;
    this.name = body.errorCode;
  }
}

export type RequestOptions<T> = {
  method: 'post';
  headers?: RequestInit['headers'];
  path: string;
  body: ValidRequestBody<T>;
};

export interface IHttpClient {
  headers: RequestInit['headers'];
  baseUrl: string;
  request: <RequestT, ResponseT>({
    method,
    headers,
    path,
    body,
  }: RequestOptions<RequestT>) => Promise<ResponseBody<ResponseT>>;
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

  async request<RequestT, ResponseT>({
    method,
    headers,
    path,
    body,
  }: RequestOptions<RequestT>): Promise<ResponseBody<ResponseT>> {
    const response = await fetch(new URL(path, this.baseUrl).toString(), {
      method,
      headers: {
        ...this.headers,
        ...headers,
      },
      body: JSON.stringify(body),
      agent: this.agent,
    });

    const responseBody = await response.json();

    if (!(response.status >= 200 && response.status < 400)) {
      throw new HttpError<ResponseT>({
        response,
        body: responseBody as ResponseError<ResponseT>,
      });
    }

    if ('errorCode' in (responseBody as ResponseError<unknown>)) {
      throw new HttpError({
        response,
        body: responseBody as ResponseError<unknown>,
      });
    }

    return responseBody as Promise<ResponseBody<ResponseT>>;
  }
}
