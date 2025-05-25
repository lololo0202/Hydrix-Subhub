import axios from 'axios';

// Define the types for Kuru.io API responses
export interface Token {
  address: string;
  decimal: string;
  name: string;
  ticker: string;
  imageurl: string;
  twitter: string | null;
  website: string | null;
  is_verified: boolean;
  contract_renounced: boolean;
  is_erc20: boolean;
  is_mintable: boolean;
  circulatingSupply: string;
  is_strict: boolean;
}

export interface MarketData {
  baseasset: string;
  quoteasset: string;
  market: string;
  kuruammvault: string;
  priceprecision: string;
  sizeprecision: string;
  ticksize: string;
  minsize: string;
  maxsize: string;
  takerfeebps: string;
  makerfeebps: string;
  blocknumber: string;
  txindex: string;
  logindex: string;
  transactionhash: string;
  triggertime: string;
  basetoken: Token;
  quotetoken: Token;
  lastPrice: number;
  lastTradeTime: string;
  volume5m: number;
  buyVolume5m: number;
  sellVolume5m: number;
  buyCount5m: number;
  sellCount5m: number;
  volume1h: number;
  buyVolume1h: number;
  sellVolume1h: number;
  buyCount1h: number;
  sellCount1h: number;
  volume6h: number;
  buyVolume6h: number;
  sellVolume6h: number;
  buyCount6h: number;
  sellCount6h: number;
  volume24h: number;
  buyVolume24h: number;
  sellVolume24h: number;
  buyCount24h: number;
  sellCount24h: number;
  uniqueTraders5m: null | number;
  uniqueTraders1h: null | number;
  uniqueTraders6h: null | number;
  uniqueTraders24h: null | number;
  priceChange5m: number;
  priceChange1h: number;
  priceChange6h: number;
  priceChange24h: number;
  liquidity: number;
  totalShares: number;
  burntShares: number;
}

export interface KuruApiResponse {
  success: boolean;
  code: number;
  timestamp: number;
  data: {
    data: MarketData[];
  };
}

// API Service class for Kuru.io
export class KuruApiService {
  private readonly baseUrl: string = 'https://api.kuru.io/api/v2';
  private readonly defaultHeaders = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'origin': 'https://www.kuru.io',
    'referer': 'https://www.kuru.io/',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
  };

  // Cache mechanism to avoid excessive API calls
  private readonly cache: Map<string, { data: any, timestamp: number }> = new Map();
  private readonly cacheTTL = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Helper function to check if cache is valid
  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    const now = Date.now();
    return (now - cached.timestamp) < this.cacheTTL;
  }

  // Generic method to fetch data with caching
  private async fetchWithCache<T>(endpoint: string): Promise<T> {
    const cacheKey = endpoint;
    if (this.isCacheValid(cacheKey)) {
      return this.cache.get(cacheKey)!.data as T;
    }

    const url = new URL(`${this.baseUrl}${endpoint}`);

    try {
      const response = await axios.get<T>(url.toString(), {
        headers: this.defaultHeaders
      });
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching from ${url.toString()}:`, error);
      throw error;
    }
  }

  // Get trending markets for a specified time period
  async getTrendingMarkets(period: '1h' | '24h' | '5m' = '24h'): Promise<KuruApiResponse> {
    return this.fetchWithCache<KuruApiResponse>(`/markets/trending/${period}`);
  }

  // Get specific market data by symbol
  async getMarketBySymbol(symbol: string): Promise<MarketData | null> {
    try {
      const response = await this.getTrendingMarkets();
      return response.data.data.find(
        market => {
          const baseSymbol = market.basetoken.ticker;
          const quoteSymbol = market.quotetoken.ticker;
          const marketSymbol = `${baseSymbol}/${quoteSymbol}`;
          return marketSymbol === symbol;
        }
      ) || null;
    } catch (error) {
      console.error(`Error getting market for symbol ${symbol}:`, error);
      return null;
    }
  }
}
