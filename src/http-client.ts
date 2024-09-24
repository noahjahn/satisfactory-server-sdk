import fetch from 'node-fetch';
import type { Response } from 'node-fetch';
import type { RequestInit } from 'node-fetch';
import { Agent } from 'https';
import type { ValidRequest } from './index.js';

export type ValidRequestBody<Data> = {
  function: keyof ValidRequest;
  data?: Data;
};

export type ResponseBody<Data> = {
  data: Data;
};

export type ResponseError<ErrorData> = {
  errorCode: string; // TODO: can we make this a dynamic value based on T? For example
  errorMessage?: string;
  errorData?: ErrorData;
};

export interface IHttpError extends Error {
  response: Response;
  body: ResponseError<unknown>;
}

export class HttpError<ErrorData> extends Error implements IHttpError {
  response: Response;
  body: ResponseError<ErrorData>;
  constructor({
    response,
    body,
  }: {
    response: Response;
    body: ResponseError<ErrorData>;
  }) {
    super(body.errorMessage ? body.errorMessage : body.errorCode);
    this.response = response;
    this.body = body;
    this.name = body.errorCode;
  }
}

export type RequestOptions<Data> = {
  method: 'post';
  headers?: RequestInit['headers'];
  path: string;
  body: ValidRequestBody<Data>;
};

export interface IHttpClient {
  headers: RequestInit['headers'];
  baseUrl: string;
  request: <RequestData, ResponseData>({
    method,
    headers,
    path,
    body,
  }: RequestOptions<RequestData>) => Promise<ResponseBody<ResponseData>>;
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

  async request<RequestData, ResponseData>({
    method,
    headers,
    path,
    body,
  }: RequestOptions<RequestData>): Promise<ResponseBody<ResponseData>> {
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
      throw new HttpError<ResponseData>({
        response,
        body: responseBody as ResponseError<ResponseData>,
      });
    }

    if ('errorCode' in (responseBody as ResponseError<unknown>)) {
      throw new HttpError({
        response,
        body: responseBody as ResponseError<unknown>,
      });
    }

    return responseBody as Promise<ResponseBody<ResponseData>>;
  }
}
