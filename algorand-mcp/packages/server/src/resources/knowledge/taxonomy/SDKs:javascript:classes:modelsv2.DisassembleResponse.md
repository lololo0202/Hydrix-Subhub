[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / DisassembleResponse

# Class: DisassembleResponse

[modelsv2](../modules/modelsv2.md).DisassembleResponse

Teal disassembly Result

## Hierarchy

- `default`

  ↳ **`DisassembleResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.DisassembleResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.DisassembleResponse.md#attribute_map)
- [result](modelsv2.DisassembleResponse.md#result)

### Methods

- [get\_obj\_for\_encoding](modelsv2.DisassembleResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.DisassembleResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new DisassembleResponse**(`result`)

Creates a new `DisassembleResponse` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result` | `Object` | disassembled Teal code |
| `result.result` | `string` | - |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2582

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### result

• **result**: `string`

disassembled Teal code

#### Defined in

client/v2/algod/models/types.ts:2576

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

▸ `Static` **from_obj_for_encoding**(`data`): [`DisassembleResponse`](modelsv2.DisassembleResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`DisassembleResponse`](modelsv2.DisassembleResponse.md)

#### Defined in

client/v2/algod/models/types.ts:2592
