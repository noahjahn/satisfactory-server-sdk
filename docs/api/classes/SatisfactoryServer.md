[@noahjahn/satisfactory-server-sdk](../globals.md) / SatisfactoryServer

# Class: SatisfactoryServer

SatisfactoryServer class

## Constructors

### new SatisfactoryServer()

> **new SatisfactoryServer**(`baseUrl`, `options`?): [`SatisfactoryServer`](SatisfactoryServer.md)

#### Parameters

• **baseUrl**: `string`

• **options?**: [`SatisfactoryServerOptions`](../type-aliases/SatisfactoryServerOptions.md)

#### Returns

[`SatisfactoryServer`](SatisfactoryServer.md)

#### Defined in

[src/index.ts:53](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/index.ts#L53)

## Properties

### baseUrl

> `protected` **baseUrl**: `string`

#### Defined in

[src/index.ts:48](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/index.ts#L48)

***

### bearerToken

> `protected` **bearerToken**: `undefined` \| `string`

#### Defined in

[src/index.ts:51](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/index.ts#L51)

***

### client

> **client**: [`IHttpClient`](../interfaces/IHttpClient.md)

#### Defined in

[src/index.ts:49](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/index.ts#L49)

## Methods

### execute()

#### execute(apiFunction, data)

> **execute**(`apiFunction`, `data`?): `Promise`\<`object`\>

##### Parameters

• **apiFunction**: `"healthcheck"`

• **data?**: [`HealthCheckRequestData`](../type-aliases/HealthCheckRequestData.md)

##### Returns

`Promise`\<`object`\>

###### data

> **data**: [`HealthCheckResponseBody`](../type-aliases/HealthCheckResponseBody.md)

##### Defined in

[src/index.ts:80](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/index.ts#L80)

#### execute(apiFunction, data)

> **execute**(`apiFunction`, `data`?): `Promise`\<`object`\>

##### Parameters

• **apiFunction**: `"passwordlogin"`

• **data?**: [`PasswordLoginRequestData`](../type-aliases/PasswordLoginRequestData.md)

##### Returns

`Promise`\<`object`\>

###### data

> **data**: [`PasswordLoginResponseBody`](../type-aliases/PasswordLoginResponseBody.md)

##### Defined in

[src/index.ts:84](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/index.ts#L84)

#### execute(apiFunction)

> **execute**(`apiFunction`): `Promise`\<`object`\>

##### Parameters

• **apiFunction**: `"queryserverstate"`

##### Returns

`Promise`\<`object`\>

###### data

> **data**: `QueryServerStateResponseBody`

##### Defined in

[src/index.ts:88](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/index.ts#L88)

***

### getDefaultData()

> **getDefaultData**\<`Data`\>(`apiFunction`): `null` \| `Data`

Returns default POST data for a specific function request if one is not passed in

#### Type Parameters

• **Data**

#### Parameters

• **apiFunction**: keyof [`ValidRequest`](../type-aliases/ValidRequest.md)

the valid api function supported

#### Returns

`null` \| `Data`

the specific Data object for the apiFunction passed in or `null` if there isn't a default

#### Defined in

[src/index.ts:71](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/index.ts#L71)
