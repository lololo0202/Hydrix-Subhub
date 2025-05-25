[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / PostTransactionsResponse

# Class: PostTransactionsResponse

[modelsv2](../modules/modelsv2.md).PostTransactionsResponse

Transaction ID of the submission.

## Hierarchy

- `default`

  ↳ **`PostTransactionsResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.PostTransactionsResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.PostTransactionsResponse.md#attribute_map)
- [txid](modelsv2.PostTransactionsResponse.md#txid)

### Methods

- [get\_obj\_for\_encoding](modelsv2.PostTransactionsResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.PostTransactionsResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new PostTransactionsResponse**(`txid`)

Creates a new `PostTransactionsResponse` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txid` | `Object` | encoding of the transaction hash. |
| `txid.txid` | `string` | - |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4131

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### txid

• **txid**: `string`

encoding of the transaction hash.

#### Defined in

client/v2/algod/models/types.ts:4125

## Methods

### get\_obj\_for\_encoding

▸ **get_obj_for_encoding**(`binary?`): `Record`\<`string`, `any`\>

Get an object ready for encoding to either JSON or msgpack.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `binary` | `boolean` | `false` | Use true to indicate that the encoding can handle raw binary objects (Uint8Arrays). Use false to indicate that raw binary objects should be converted to base64 strings. True should be used for objects that will be encoded with msgpack, and false should be used for objects that will be encoded with JSON. |

#### Returns

`Record`\<`string`, `any`\>

#### Inherited from

BaseModel.get\_obj\_for\_encoding

#### Defined in

client/v2/basemodel.ts:65

___

### from\_obj\_for\_encoding

▸ `Static` **from_obj_for_encoding**(`data`): [`PostTransactionsResponse`](modelsv2.PostTransactionsResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`PostTransactionsResponse`](modelsv2.PostTransactionsResponse.md)

#### Defined in

client/v2/algod/models/types.ts:4141
