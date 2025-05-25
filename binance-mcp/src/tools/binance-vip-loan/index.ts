// src/tools/binance-vip-loan/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBinanceVipLoanMarketApiTools } from "./market-api/index.js";
import { registerBinanceVipLoanTradeApiTools } from "./trade-api/index.js";
import { registerBinanceVipLoanUserInformationApiTools } from "./userInformation-api/index.js";

export function registerBinanceVipLoanTools(server: McpServer) {
    registerBinanceVipLoanMarketApiTools(server);
    registerBinanceVipLoanTradeApiTools(server);
    registerBinanceVipLoanUserInformationApiTools(server);
}
