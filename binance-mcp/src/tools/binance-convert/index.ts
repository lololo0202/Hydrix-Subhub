// src/tools/binance-convert/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBinanceConvertTradeTools } from "./trade-api/index.js";
import { registerBinanceConvertMarketDataTools } from "./market-data-api/index.js";

export function registerBinanceConvertTools(server: McpServer) {
    // Register tools for accessing market data from Binance Convert
    registerBinanceConvertMarketDataTools(server);

    // Register tools for performing trades on Binance Convert
    registerBinanceConvertTradeTools(server);
}
