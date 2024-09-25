[@noahjahn/satisfactory-server-sdk](../globals.md) / HttpError

# Class: HttpError\<ErrorData\>

## Extends

- `Error`

## Type Parameters

• **ErrorData**

## Implements

- [`IHttpError`](../interfaces/IHttpError.md)

## Constructors

### new HttpError()

> **new HttpError**\<`ErrorData`\>(`__namedParameters`): [`HttpError`](HttpError.md)\<`ErrorData`\>

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.body**: [`ResponseError`](../type-aliases/ResponseError.md)\<`ErrorData`\>

• **\_\_namedParameters.response**: `Response`

#### Returns

[`HttpError`](HttpError.md)\<`ErrorData`\>

#### Overrides

`Error.constructor`

#### Defined in

[src/http-client.ts:30](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/http-client.ts#L30)

## Properties

### body

> **body**: [`ResponseError`](../type-aliases/ResponseError.md)\<`ErrorData`\>

#### Implementation of

[`IHttpError`](../interfaces/IHttpError.md).[`body`](../interfaces/IHttpError.md#body)

#### Defined in

[src/http-client.ts:29](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/http-client.ts#L29)

***

### cause?

> `optional` **cause**: `unknown`

#### Implementation of

[`IHttpError`](../interfaces/IHttpError.md).[`cause`](../interfaces/IHttpError.md#cause)

#### Inherited from

`Error.cause`

#### Defined in

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Implementation of

[`IHttpError`](../interfaces/IHttpError.md).[`message`](../interfaces/IHttpError.md#message)

#### Inherited from

`Error.message`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Implementation of

[`IHttpError`](../interfaces/IHttpError.md).[`name`](../interfaces/IHttpError.md#name)

#### Inherited from

`Error.name`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### response

> **response**: `Response`

#### Implementation of

[`IHttpError`](../interfaces/IHttpError.md).[`response`](../interfaces/IHttpError.md#response)

#### Defined in

[src/http-client.ts:28](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/http-client.ts#L28)

***

### stack?

> `optional` **stack**: `string`

#### Implementation of

[`IHttpError`](../interfaces/IHttpError.md).[`stack`](../interfaces/IHttpError.md#stack)

#### Inherited from

`Error.stack`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:143

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

node\_modules/@types/node/globals.d.ts:145

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:136
