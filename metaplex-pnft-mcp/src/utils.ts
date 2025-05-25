import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

export const RPC_URL = process.env.RPC_URL || "https://api.devnet.solana.com";
export const PRIVATE_KEY = process.env.PRIVATE_KEY as string;

if (!PRIVATE_KEY) {
	throw new Error("PRIVATE_KEY is not defined in environment variables");
}

export let walletKeypair: Keypair;

async function initializeWallet() {
	try {
		walletKeypair = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));
	} catch (error: any) {
		throw new Error(`❌ Failed to initialize wallet: ${error.message}`);
	}
}
// Initialize the wallet immediately
initializeWallet();
