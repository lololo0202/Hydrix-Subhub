// src/tools/binance-c2c/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBinanceGetC2CTradeHistory } from "./C2C/getC2CTradeHistory.js";

export function registerBinanceC2CTradeHistoryTools(server: McpServer) {
    registerBinanceGetC2CTradeHistory(server);
}
