// src/tools/binance-wallet/capital-api/withdrawHistory.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";

export function registerBinanceWalletWithdrawHistory(server: McpServer) {
    server.tool(
        "BinanceWalletWithdrawHistory",
        "Get withdraw history.",
        {
            coin: z.string().optional().describe("Coin symbol"),
            withdrawOrderId: z.string().optional().describe("Withdraw order ID"),
            status: z.number().optional().describe("Withdraw status"),
            startTime: z.number().optional().describe("Start time in milliseconds"),
            endTime: z.number().optional().describe("End time in milliseconds"),
            offset: z.number().optional().describe("Pagination offset"),
            limit: z.number().optional().describe("Number of records to return"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ coin, withdrawOrderId, status, startTime, endTime, offset, limit, recvWindow }) => {
            try {
                const params: any = {};
                if (coin !== undefined) params.coin = coin;
                if (withdrawOrderId !== undefined) params.withdrawOrderId = withdrawOrderId;
                if (status !== undefined) params.status = status;
                if (startTime !== undefined) params.startTime = startTime;
                if (endTime !== undefined) params.endTime = endTime;
                if (offset !== undefined) params.offset = offset;
                if (limit !== undefined) params.limit = limit;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.withdrawHistory(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved withdraw history. Total withdrawals: ${data.length || 0}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    content: [
                        { type: "text", text: `Failed to retrieve withdraw history: ${errorMessage}` }
                    ],
                    isError: true
                };
            }
        }
    );
}