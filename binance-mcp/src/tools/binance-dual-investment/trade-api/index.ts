// src/tools/binance-dual-investment/trade-api/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBinanceSubscribeDualInvestmentProducts } from "./subscribeDualInvestmentProducts.js";
import { registerBinanceCheckDualInvestmentAccounts } from "./checkDualInvestmentAccounts.js";
import { registerBinanceGetDualInvestmentPositions } from "./getDualInvestmentPositions.js";
import { registerBinanceChangeAutoCompoundStatus } from "./changeAutoCompoundStatus.js";

export function registerBinanceDualInvestmentTradeApiTools(server: McpServer) {
    registerBinanceSubscribeDualInvestmentProducts(server);
    registerBinanceCheckDualInvestmentAccounts(server);
    registerBinanceGetDualInvestmentPositions(server);
    registerBinanceChangeAutoCompoundStatus(server);
}
