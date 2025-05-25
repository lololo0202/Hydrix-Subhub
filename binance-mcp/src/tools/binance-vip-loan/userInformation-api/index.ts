// src/tools/binance-vip-loan/userInformation-api/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBinanceCheckVIPLoanCollateralAccount } from "./checkVIPLoanCollateralAccount.js";
import { registerBinanceGetVIPLoanOngoingOrders } from "./getVIPLoanOngoingOrders.js";
import { registerBinanceQueryApplicationStatus } from "./queryApplicationStatus.js";

export function registerBinanceVipLoanUserInformationApiTools(server: McpServer) {
    registerBinanceCheckVIPLoanCollateralAccount(server);
    registerBinanceGetVIPLoanOngoingOrders(server);
    registerBinanceQueryApplicationStatus(server);
}
