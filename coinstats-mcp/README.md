# CoinStats MCP Server

MCP Server for the CoinStats API. Provides access to cryptocurrency market data, portfolio tracking, and news.

## Setup

### API Key

You need a CoinStats API key. Obtain one from the [CoinStats API Documentation](https://openapi.coinstats.app).

### Usage with MCP clients

Add the following to your client configuration:

#### NPX

```json
{
  "mcpServers": {
    "coinstats-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@coinstats/coinstats-mcp"
      ],
      "env": {
        "COINSTATS_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

Replace `<YOUR_API_KEY>` with your actual CoinStats API key.

#### Docker

```json
{
  "mcpServers": {
    "coinstats-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "COINSTATS_API_KEY",
        "coinstats/coinstats-mcp"
      ],
      "env": {
        "COINSTATS_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

Replace `<YOUR_API_KEY>` with your actual CoinStats API key.

## Build

To build the project locally:

```bash
npm run build
```

This command installs dependencies, compiles TypeScript to JavaScript, and sets execute permissions.

## License

This MCP server is licensed under the MIT License. See the standard [MIT License text](https://opensource.org/licenses/MIT) for details.
