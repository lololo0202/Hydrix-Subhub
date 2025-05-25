import { z } from "zod";

export const ConfigSchema = z.object({
  lnbitsUrl: z.string().min(1, "LNbits URL is required"),
  adminKey: z.string().min(1, "LNbits admin key is required"),
  readKey: z.string().min(1, "LNbits read key is required"),
});

export type Config = z.infer<typeof ConfigSchema>;

export const PayInvoiceSchema = z.object({
  invoice: z.string().min(1, "Invoice cannot be empty"),
});

export type PayInvoiceArgs = z.infer<typeof PayInvoiceSchema>;

export interface PaidInvoice {
  invoice: string;
}

/**
 * Error codes for Nostr operations
 */
export enum LightningErrorCode {
  CONNECTION_ERROR = "connection_error",
  PAYMENT_ERROR = "payment_error",
  NOT_CONNECTED = "not_connected",
  DISCONNECT_ERROR = "disconnect_error",
}

export class LightningError extends Error {
  constructor(
    message: string,
    public readonly code: LightningErrorCode | string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "NostrError";
  }
}

export enum ServerMode {
  STDIN = "stdin",
  SSE = "sse",
}

export interface ServerConfig {
  mode: ServerMode;
  port?: number; // For SSE mode
}

export interface WalletInfo {
  id: string;
  name: string;
  balance: number;
}

export interface PaymentResponse {
  payment_hash: string;
}

export interface Tag {
  tagName: string;
  data: string | number | boolean | unknown;
}

export interface DecodedInvoice {
  paymentRequest: string;
  prefix: string;
  wordsTemp: string;
  complete: boolean;
  millisatoshis: string;
  satoshis: number;
  timestamp: number;
  timestampString: string;
  timeExpireDate: number;
  timeExpireDateString: string;
  tags: Tag[];
  merchantName?: string;
  description?: string;
}

export interface HumanFriendlyInvoice {
  network: string;
  amount: number;
  description: string;
  expiryDate: string;
  status: string;
}

export interface ProviderError extends Error {
  data?: unknown;
}
