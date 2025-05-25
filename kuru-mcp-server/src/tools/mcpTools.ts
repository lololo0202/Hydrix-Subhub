import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { KuruApiService } from "../services/KuruApiService.js";

export function registerMcpTools(server: McpServer, kuruApi: KuruApiService) {
  server.tool(
    "get-price",
    {
      symbol: z.string().describe("Trading pair in format BASE/QUOTE (e.g., MON/USDC)")
    },
    async ({ symbol }) => {
      try {
        const market = await kuruApi.getMarketBySymbol(symbol);
        
        if (!market) {
          return {
            content: [{ type: "text", text: `Market not found: ${symbol}` }],
            isError: true
          };
        }
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify(market)
          }]
        };
      } catch (error) {
        console.error(`Error getting price for ${symbol}:`, error);
        return {
          content: [{ type: "text", text: `Error fetching price: ${error}` }],
          isError: true
        };
      }
    }
  );

  server.tool(
    "get-all-trading-pairs",
    "Get all trading pairs",
    {},
    async () => {
      try {
        const markets = await kuruApi.getTrendingMarkets();
        return {
          content: [{ type: "text", text: JSON.stringify(markets.data.data) }]
        };
      } catch (error) {
        console.error(`Error getting all trading pairs:`, error);
        return {
          content: [{ type: "text", text: `Error fetching all trading pairs: ${error}` }],
          isError: true
        };
      }
    }
  );

  server.tool(
    "calculate-value",
    {
      symbol: z.string().describe("Trading pair in format BASE/QUOTE (e.g., MON/USDC)"),
      amount: z.number().describe("Amount of the base token")
    },
    async ({ symbol, amount }) => {
      try {
        const market = await kuruApi.getMarketBySymbol(symbol);
        
        if (!market) {
          return {
            content: [{ type: "text", text: `Market not found: ${symbol}` }],
            isError: true
          };
        }
        
        const baseSymbol = market.basetoken.ticker;
        const quoteSymbol = market.quotetoken.ticker;
        const value = amount * market.lastPrice;
        
        return {
          content: [{
            type: "text",
            text: `${amount} ${baseSymbol} = ${value.toFixed(6)} ${quoteSymbol} (at ${market.lastPrice.toFixed(6)} ${quoteSymbol} per ${baseSymbol})`
          }]
        };
      } catch (error) {
        console.error(`Error calculating value for ${symbol}:`, error);
        return {
          content: [{ type: "text", text: `Error calculating value: ${error}` }],
          isError: true
        };
      }
    }
  );

  return server;
} 