import readline from "node:readline";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { Connection, Keypair } from "@solana/web3.js";

import base58 from "bs58";

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { crossmint } from "@goat-sdk/crossmint";
import { solana } from "@goat-sdk/wallet-solana";
require("dotenv").config();

// 1. Create a wallet client
const connection = new Connection(process.env.SOLANA_RPC_URL as string);
const keypair = Keypair.fromSecretKey(base58.decode(process.env.SOLANA_PRIVATE_KEY as string));

// Use staging key for development, production key for mainnet
const apiKey = process.env.CROSSMINT_API_KEY;

if (!apiKey) {
    throw new Error("Missing Crossmint API key");
}

// Initialize Crossmint plugins for wallet creation and NFT minting
const { wallets, mint } = crossmint(apiKey);

async function chat() {
    // 2. Get your onchain tools for your wallet
    const tools = await getOnChainTools({
        wallet: solana({
            keypair,
            connection,
        }),
        plugins: [
            wallets(), // Allows you to create a wallet for a Twitter user
            mint(), // Allows you to mint an NFT to a specific wallet
        ],
    });

    // 3. Create a readline interface to interact with the agent
    type Message = {
        role: "user" | "assistant";
        content: string;
    };

    console.log("Chat started. Type 'exit' to end the conversation.");

    const conversationHistory: Message[] = [];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const askQuestion = () => {
        rl.question("You: ", async (prompt) => {
            if (prompt.toLowerCase() === "exit") {
                rl.close();
                return;
            }

            conversationHistory.push({ role: "user", content: prompt });

            const result = await generateText({
                model: openai("gpt-4o-mini"),
                tools: tools,
                maxSteps: 10, // Maximum number of tool invocations per request
                prompt: `You are a based crypto degen assistant. You're knowledgeable about DeFi, NFTs, and trading. You use crypto slang naturally and stay up to date with Solana ecosystem. You help users with their trades and provide market insights. Keep responses concise and use emojis occasionally.

Previous conversation:
${conversationHistory.map((m) => `${m.role}: ${m.content}`).join("\n")}

Current request: ${prompt}`,
                onStepFinish: (event) => {
                    console.log("Tool execution:", event.toolResults);
                },
            });

            conversationHistory.push({
                role: "assistant",
                content: result.text,
            });
            console.log("Assistant:", result.text);
            askQuestion();
        });
    };

    askQuestion();
}

chat().catch(console.error);
