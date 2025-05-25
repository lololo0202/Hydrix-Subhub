# Kuru.io MCP Server

This project implements a Model Context Protocol (MCP) server for accessing Kuru.io crypto exchange data, making it accessible to LLMs and AI assistants.

## Features

- **Market Data**: Access real-time market data and trending markets
- **Tools**: Get current prices, calculate token values, and list all trading pairs
- **Caching**: Built-in caching mechanism to reduce API calls

## Demonstration
Below is a demonstration of how to use the Kuru.io MCP server with Claude.
![Demonstration](https://github.com/user-attachments/assets/35c4002a-56ea-46af-a262-30d953eaa586)

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Starting the server

#### As a stdio server (for use with LLM tools like Claude Desktop)

```bash
npm start
```

#### For debugging with MCP Inspector

```bash
npm run inspector
```

### MCP Tools

The server provides these tools:

- `get-price` - Get the current price for a trading pair
  - Parameter: `symbol` - Trading pair in format BASE/QUOTE (e.g., `MON/USDC`)
  - Example: "What's the current price of MON/USDC?"

- `get-all-trading-pairs` - Get all available trading pairs
  - Example: "Show me all trading pairs available on Kuru.io"

- `calculate-value` - Calculate the value of a token amount in another currency
  - Parameters:
    - `symbol` - Trading pair in format BASE/QUOTE (e.g., `MON/USDC`)
    - `amount` - Amount of the base token
  - Example: "How much is 100 MON worth in USDC?"

## Example Usage with Claude

### In Claude Desktop

1. Add a new MCP Tool in Claude Desktop
2. Choose "Local Process"
3. Set the command to run the server:
   ```
   node /path/to/kuru-mcp-server/dist/index.js
   ```
4. Save and connect

Now you can use the Kuru.io MCP tools in your conversations with Claude.

### Example Prompts

Try asking Claude:
- "What are the trending markets on Kuru.io right now?"
- "Give me information about the MON/USDC market"
- "What's the current price of MON/USDC?"
- "Calculate the value of 100 MON in USDC"
- "Show me all trading pairs available on Kuru.io"

## Technical Details

- Built with TypeScript and Node.js
- Uses the Model Context Protocol SDK v1.8.0
- Implements caching to reduce API calls (5-minute TTL)
- Provides comprehensive market data including price, volume, and liquidity information

## Credits

This project uses the Kuru.io site API and implements the Model Context Protocol specification.