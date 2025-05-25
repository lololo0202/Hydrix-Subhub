
<div align="center">
<img src="https://github.com/user-attachments/assets/5fc7f121-259c-492c-8bca-f15fe7eb830c" alt="GOAT" width="100px" height="auto" style="object-fit: contain;">
</div>

# Send and receive tokens on EVM
## 🚀 Quickstart

This example demonstrates how to use GOAT to **send and receive ETH and ERC-20 tokens** on EVM networks. This example can be implemented with any other EVM network by changing the chain and RPC URL.

You can use this example with any other agent framework, chain, and wallet of your choice.

## Setup
1. Clone the repository:
```bash
git clone https://github.com/goat-sdk/goat.git
```

2. Go to the example directory:
```bash
cd python/examples/by-use-case/evm-send-and-receive-tokens
```

3. Copy the `.env.template` and populate with your values:
```bash
cp .env.template .env
```
- `OPENAI_API_KEY`
- `WALLET_PRIVATE_KEY`
- `RPC_PROVIDER_URL`

4. Install dependencies:
```bash
poetry install
```

## Usage
1. Run the interactive CLI:
```bash
poetry run python example.py
```

2. Chat with the agent:
- Check your balance for ERC-20 tokens
- Send ERC-20 tokens to another address
- Check your balance again to see the tokens you just sent

## Using in production
In production, developers require advanced wallet setups that utilize [smart wallets](https://github.com/goat-sdk/goat/tree/main/typescript/examples/by-wallet/crossmint-smart-wallets), which allow them to:
1. **Increase security** by setting programmable permissions (e.g. limiting fund amounts, restricting contract interactions, and defining required signatures)
2. **Maintain regulatory compliance** by ensuring agent wallets are non-custodial. This means that:
     - Launchpads, wallet providers, or agent platforms never have access to agents' wallets.
     - Agent platforms do not require money transmitter licenses.

### Agent Wallets
[Crossmint](https://docs.crossmint.com/wallets/quickstarts/agent-wallets) offers one of the most advanced solutions for agent developers and launchpads: [Agent Wallets](https://docs.crossmint.com/wallets/quickstarts/agent-wallets).

To integrate Agent Wallets with GOAT, check out the following quickstarts:
1. Agent Wallets Quickstart [[EVM](https://github.com/goat-sdk/goat/tree/main/python/examples/by-wallet/crossmint), [Solana](https://github.com/goat-sdk/goat/tree/main/python/examples/by-wallet/crossmint)]
2. [Agent Launchpad Starter Kit](https://github.com/Crossmint/agent-launchpad-starter-kit/)

<footer>
<br/>
<br/>
<div>
  <img src="https://github.com/user-attachments/assets/59fa5ddc-9d47-4d41-a51a-64f6798f94bd" alt="GOAT" width="100%" height="auto" style="object-fit: contain; max-width: 800px;">

<div>
</footer>
