# Metaplex MCP – pNFT Creation via Metaplex

Metaplex pNFT MCP is a TypeScript/Node.js Model Context Protocol (MCP) server that provides a structured and agent-friendly interface for the creation of programmable NFTs (pNFTs) using the [Metaplex](https://developers.metaplex.com/) protocol on Solana.

This module allows AI agents, bots, or user-facing applications to mint rich, policy-controlled NFTs by encoding user intent and asset metadata into actionable instructions. Ideal for decentralized content creators, dynamic asset generation, or automated collection management.

## Features

- 🖼️ **pNFT Minting:** Create Metaplex-compliant programmable NFTs with custom rules, creators, and metadata.
- 🧠 **Context-Driven Creation:** Encode asset details (name, description, URI, attribute) through structured model context.
- 🔐 **Secure & Verifiable Transfers:** Ensures swaps are signed and verified with full user approval.
- 🧩 **Dynamic Use Cases:** Supports minting NFTs for identity, media, access control, or game assets.
- 💼 **Secure Transaction Handling**: Signs and sends transactions securely, using environment-based key management.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Claude for Deskop](https://claude.ai/download)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/collinsezedike/metaplex-pnft-mcp
   cd metaplex-pnft-mcp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Build the project:**

   ```bash
   npm run build
   # or
   yarn run build
   ```

4. **Configure the MCP for Claude for Desktop:**  
    Add the MCP configuration to `C:\Users\{User}\AppData\Roaming\Claude\claude_desktop_config.json`

     ```json
    "metaplex-pnft-mcp": {
        "command": "node",
        "args": [
            "<PROJECT_ABSOLUTE_FILEPATH>\\build\\index.js"
        ],
        "env": {
            "PRIVATE_KEY": "<base58-encoded solana private key>",
        }
    }
     ```

5. **Run the application:**
    Head to open Claude for Desktop and verify that the Metaplex pNFT MCP tools has been added. Try asking the Chatbot for the to create an NFT with arbitrary data.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
