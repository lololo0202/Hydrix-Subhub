[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / ApplicationLocalStatesResponse

# Class: ApplicationLocalStatesResponse

[indexerModels](../modules/indexerModels.md).ApplicationLocalStatesResponse

## Hierarchy

- `default`

  ↳ **`ApplicationLocalStatesResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.ApplicationLocalStatesResponse.md#constructor)

### Properties

- [appsLocalStates](indexerModels.ApplicationLocalStatesResponse.md#appslocalstates)
- [attribute\_map](indexerModels.ApplicationLocalStatesResponse.md#attribute_map)
- [currentRound](indexerModels.ApplicationLocalStatesResponse.md#currentround)
- [nextToken](indexerModels.ApplicationLocalStatesResponse.md#nexttoken)

### Methods

- [get\_obj\_for\_encoding](indexerModels.ApplicationLocalStatesResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.ApplicationLocalStatesResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationLocalStatesResponse**(`«destructured»`)

Creates a new `ApplicationLocalStatesResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `appsLocalStates` | [`ApplicationLocalState`](indexerModels.ApplicationLocalState.md)[] |
| › `currentRound` | `number` \| `bigint` |
| › `nextToken?` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:989

## Properties

### appsLocalStates

• **appsLocalStates**: [`ApplicationLocalState`](indexerModels.ApplicationLocalState.md)[]

#### Defined in

client/v2/indexer/models/types.ts:969

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### currentRound

• **currentRound**: `number` \| `bigint`

Round at which the results were computed.

#### Defined in

client/v2/indexer/models/types.ts:974

___

### nextToken

• `Optional` **nextToken**: `string`

Used for pagination, when making another request provide this token with the
next parameter.

#### Defined in

client/v2/indexer/models/types.ts:980

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationLocalStatesResponse`](indexerModels.ApplicationLocalStatesResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationLocalStatesResponse`](indexerModels.ApplicationLocalStatesResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:1011
