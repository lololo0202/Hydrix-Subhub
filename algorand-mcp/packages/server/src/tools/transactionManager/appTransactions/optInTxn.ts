import { Transaction, makeApplicationOptInTxnFromObject, OnApplicationComplete } from 'algosdk';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AppOptInTxnParams } from './types.js';

/**
 * Creates an application opt-in transaction
 * @param params The parameters for opting into the application
 * @returns The created transaction
 * @throws {McpError} If the transaction creation fails
 */
export function makeApplicationOptInTxn(params: AppOptInTxnParams): Transaction {
  try {
    // Create a new object with the required structure
    const txnParams = {
      from: params.from,
      appIndex: params.appIndex,
      suggestedParams: params.suggestedParams,
      note: params.note,
      lease: params.lease,
      rekeyTo: params.rekeyTo,
      appArgs: params.appArgs,
      accounts: params.accounts,
      foreignApps: params.foreignApps,
      foreignAssets: params.foreignAssets,
      boxes: params.boxes
    };

    // Pass the onComplete parameter separately
    return makeApplicationOptInTxnFromObject({
      ...txnParams,
      onComplete: OnApplicationComplete.OptInOC
    } as any); // Use type assertion since the types are not perfectly aligned
  } catch (error) {
    console.error('[MCP Error] Failed to create application opt-in transaction:', error);
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to create application opt-in transaction: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Handles the application opt-in tool request
 * @param args The tool arguments
 * @param suggestedParams The suggested transaction parameters
 * @returns The transaction parameters
 * @throws {McpError} If the parameters are invalid
 */
export function handleOptInTxn(args: Record<string, unknown>, suggestedParams: any): Record<string, any> {
  try {
    if (!args.from || !args.appIndex) {
      console.error('[MCP Error] Invalid application opt-in parameters');
      throw new McpError(ErrorCode.InvalidParams, 'Invalid application opt-in parameters');
    }

    // Create transaction with proper parameter handling
    const txnParams: Record<string, any> = {
      from: String(args.from),
      appIndex: Number(args.appIndex),
      fee: suggestedParams.fee,
      firstRound: suggestedParams.firstRound,
      lastRound: suggestedParams.lastRound,
      genesisID: suggestedParams.genesisID,
      genesisHash: suggestedParams.genesisHash,
      type: 'appl',
      onComplete: OnApplicationComplete.OptInOC
    };

    // Handle optional fields
    if (typeof args.note === 'string') {
      const noteBytes = new TextEncoder().encode(args.note);
      txnParams.note = Buffer.from(noteBytes).toString('base64');
    }
    if (typeof args.lease === 'string') {
      const leaseBytes = new TextEncoder().encode(args.lease);
      txnParams.lease = Buffer.from(leaseBytes).toString('base64');
    }
    if (typeof args.rekeyTo === 'string') {
      txnParams.rekeyTo = String(args.rekeyTo);
    }
    if (Array.isArray(args.appArgs)) {
      txnParams.appArgs = args.appArgs.map(arg => {
        const bytes = new TextEncoder().encode(String(arg));
        return Buffer.from(bytes).toString('base64');
      });
    }
    if (Array.isArray(args.accounts)) {
      txnParams.accounts = args.accounts.filter((acc): acc is string => typeof acc === 'string');
    }
    if (Array.isArray(args.foreignApps)) {
      txnParams.foreignApps = args.foreignApps.filter((app): app is number => typeof app === 'number');
    }
    if (Array.isArray(args.foreignAssets)) {
      txnParams.foreignAssets = args.foreignAssets.filter((asset): asset is number => typeof asset === 'number');
    }

    return txnParams;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    console.error('[MCP Error] Failed to handle application opt-in:', error);
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle application opt-in: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
