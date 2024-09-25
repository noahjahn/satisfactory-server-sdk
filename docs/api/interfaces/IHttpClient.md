[@noahjahn/satisfactory-server-sdk](../globals.md) / IHttpClient

# Interface: IHttpClient

## Properties

### baseUrl

> **baseUrl**: `string`

#### Defined in

[src/http-client.ts:53](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/http-client.ts#L53)

***

### headers

> **headers**: `undefined` \| `HeadersInit`

#### Defined in

[src/http-client.ts:52](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/http-client.ts#L52)

***

### request()

> **request**: \<`RequestData`, `ResponseData`\>(`__namedParameters`) => `Promise`\<[`ResponseBody`](../type-aliases/ResponseBody.md)\<`ResponseData`\>\>

#### Type Parameters

• **RequestData**

• **ResponseData**

#### Parameters

• **\_\_namedParameters**: [`RequestOptions`](../type-aliases/RequestOptions.md)\<`RequestData`\>

#### Returns

`Promise`\<[`ResponseBody`](../type-aliases/ResponseBody.md)\<`ResponseData`\>\>

#### Defined in

[src/http-client.ts:54](https://github.com/noahjahn/satisfactory-server-sdk/blob/9fd9914d30250e417f9517f3074b4e24d1ca9dd5/src/http-client.ts#L54)
