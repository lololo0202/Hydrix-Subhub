# 0xMONK MCP Server

A Model Conntext Protocol (MCP) server for interacting with the 0xMONK Trading Agent API.

## Overview

This project provides a suite of tools for AI assistants to interact with the 0xMONK API, allowing them to manage trading agents, execute trades, and monitor portfolios.

## Features

- **Agent Management**

  - Create, update, and delete trading agents
  - View agent details and get all available agents
  - Add or remove parent agents (for inheritance)
  - Get agents by user ID or Telegram user ID

- **Trading Operations**

  - Execute buy and sell orders for tokens
  - Get buy recommendations for agents
  - Synchronize agent state with blockchain
  - Monitor task status

- **Portfolio Management**

  - Monitor agent portfolios, holdings, and trade history
  - Access trading decisions and calls made by agents
  - Get wallet details for agents and Telegram users

- **ProAgent Interaction**
  - Query the ProAgent for market information and trading insights
  - Get real-time cryptocurrency prices and market data

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/FereAI-MCP.git
   cd FereAI-MCP
   ```

2. Install uv:

   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

3. Create a virtual environment and install dependencies:

   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv pip install -r requirements.txt
   ```

4. Configure environment variables:

Get your FereAI Key from [https://docs.fereai.xyz/docs/api/api_access](https://docs.fereai.xyz/docs/api/api_access) and set it in the `.env` file.

```bash
cp .env.example .env
# Edit .env with your configuration
```

## Usage

Run the MCP server:

```bash
uv run main.py
```

## Project Structure

```
FereAI-MCP/
├── .env                  # Environment variables
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── main.py               # Server entry point
├── monk.json             # API specification
├── pyproject.toml        # Python project configuration
├── README.md             # This file
├── requirements.txt      # Python dependencies
└── src/                  # Source code
    ├── agent.py          # Agent-related API functions
    ├── config.py         # Configuration module
    ├── main.py           # MCP server implementation
    ├── pro_agent.py      # Pro Agent implementation
    └── utils.py          # Utility functions
```

## API Documentation

For more information about the 0xMONK API, refer to the [monk.json](monk.json) file or visit the official documentation.

## License

MIT
