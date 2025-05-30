---
arc: 9
title: Algorand Wallet Algodv2 and Indexer API
description: An API for accessing Algod and Indexer through a user's preferred connection.
author: DanBurton (@DanBurton)
discussions-to: https://github.com/algorandfoundation/ARCs/issues/52
status: Deprecated
type: Standards Track
category: Interface
created: 2021-08-09
---

# Algorand Wallet Algodv2 and Indexer API

## Abstract

Functions `getAlgodv2Client` and `getIndexerClient` which return a `BaseHTTPClient` that can be used to construct an `Algodv2Client` and an `IndexerClient` respectively (from the <a href="https://github.com/algorand/js-algorand-sdk/blob/develop/src/client/baseHTTPClient.ts">JS SDK</a>);

## Specification

### Interface `GetAlgodv2ClientFunction`

```ts
type GetAlgodv2ClientFunction = () => Promise<BaseHTTPClient>
```

Returns a promised `BaseHTTPClient` that can be used to then build an `Algodv2Client`, where `BaseHTTPClient` is an interface matching the interface `algosdk.BaseHTTPClient` from the <a href="https://github.com/algorand/js-algorand-sdk/blob/develop/src/client/baseHTTPClient.ts">JS SDK</a>).

### Interface `GetIndexerClientFunction`

```ts
type GetIndexerClientFunction = () => Promise<BaseHTTPClient>
```

Returns a promised `BaseHTTPClient` that can be used to then build an `Indexer`, where `BaseHTTPClient` is an interface matching the interface `algosdk.BaseHTTPClient` from the <a href="https://github.com/algorand/js-algorand-sdk/blob/develop/src/client/baseHTTPClient.ts">JS SDK</a>).

### Security considerations

The returned `BaseHTTPClient` **SHOULD** filter the queries made to prevent potential attacks and reject (i.e., throw an exception) if this is not satisfied.
A non-exhaustive list of checks is provided below:
* Check that the relative PATH does not contain `..`.
* Check that the only provided headers are the ones used by the SDK (when this ARC was written: `accept` and `content-type`) and their values are the ones provided by the SDK.

`BaseHTTPClient` **MAY** impose rate limits.

For higher security, `BaseHTTPClient` **MAY** also check the queries with regards to the OpenAPI specification of the node and the indexer.

In case the wallet uses an API service that is secret or provided by the user, the wallet **MUST** ensure that the URL of the service and the potential tokens/headers are not leaked to the dApp.

> Leakage may happen by accidentally including too much information in responses or errors returned by the various methods. For example, if the nodeJS superagent library is used without filtering errors and responses, errors and responses may include the request object, which includes the potentially secret API service URL / secret token headers.

## Rationale

Nontrivial dApps often require the ability to query the network for activity. Algorand dApps written without regard to wallets are likely written using `Algodv2` and `Indexer` from `algosdk`.
This document allows dApps to instantiate `Algodv2` and `Indexer` for a wallet API service, making it easy for JavaScript dApp authors to port their code to work with wallets.

## Security Considerations

None.

## Copyright

Copyright and related rights waived via <a href="https://creativecommons.org/publicdomain/zero/1.0/">CCO</a>.
