const { z } = require("zod");
const {
  accelerationBands, averageTrueRange, bollingerBands, bollingerBandsWidth,
  chandelierExit, donchianChannel, keltnerChannel, movingStandardDeviation,
  projectionOscillator, trueRange, ulcerIndex,
} = require("indicatorts");
const fetchOhlcvData = require("../utils/fetchOhlcvData");

module.exports = (server) => {
  server.tool(
    "calculate_acceleration_bands",
    "Calculate the Acceleration Bands (AB) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(20).describe("Period length for AB"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = accelerationBands(asset.highs, asset.lows, asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_average_true_range",
    "Calculate the Average True Range (ATR) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(14).describe("Period length for ATR"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = averageTrueRange(asset.highs, asset.lows, asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_bollinger_bands",
    "Calculate the Bollinger Bands (BB) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(20).describe("Period length for BB"),
      stdDev: z.number().default(2).describe("Standard deviation multiplier"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, stdDev, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = bollingerBands(asset.closings, { period, stdDev });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_bollinger_bands_width",
    "Calculate the Bollinger Bands Width (BBW) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(20).describe("Period length for BBW"),
      stdDev: z.number().default(2).describe("Standard deviation multiplier"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, stdDev, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = bollingerBandsWidth(asset.closings, { period, stdDev });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_chandelier_exit",
    "Calculate the Chandelier Exit (CE) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(22).describe("Period length for CE"),
      multiplier: z.number().default(3).describe("Multiplier for CE"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, multiplier, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = chandelierExit(asset.highs, asset.lows, asset.closings, { period, multiplier });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_donchian_channel",
    "Calculate the Donchian Channel (DC) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(20).describe("Period length for DC"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = donchianChannel(asset.highs, asset.lows, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_keltner_channel",
    "Calculate the Keltner Channel (KC) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(20).describe("Period length for KC"),
      multiplier: z.number().default(2).describe("Multiplier for KC"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, multiplier, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = keltnerChannel(asset.highs, asset.lows, asset.closings, { period, multiplier });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_moving_standard_deviation",
    "Calculate the Moving Standard Deviation (MSTD) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(20).describe("Period length for MSTD"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = movingStandardDeviation(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_projection_oscillator",
    "Calculate the Projection Oscillator (PO) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(14).describe("Period length for PO"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = projectionOscillator(asset.highs, asset.lows, asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_true_range",
    "Calculate the True Range (TR) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = trueRange(asset.highs, asset.lows, asset.closings);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_ulcer_index",
    "Calculate the Ulcer Index (UI) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.string().default("1h").describe("Timeframe, e.g., '1m', '1h', '1d'"),
      period: z.number().default(14).describe("Period length for UI"),
      limit: z.number().default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = ulcerIndex(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );
};