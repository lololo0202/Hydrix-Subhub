import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	createProgrammableNft,
	mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
	createSignerFromKeypair,
	generateSigner,
	percentAmount,
	signerIdentity,
} from "@metaplex-foundation/umi";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import { RPC_URL, walletKeypair } from "./utils";

interface CreateNFTParams {
	name: string;
	description: string;
	image: string;
	external_url: string;
	attributes: {
		trait_type: string;
		value: string;
	}[];
}

const server = new McpServer({
	name: "metaplex-nft-mcp",
	version: "1.0.0",
	capabilities: {
		resources: {},
		tools: {},
	},
});

server.tool(
	"create-nft",
	"Create a programmable NFT",
	{
		name: z.string().describe("Name of the NFT"),
		description: z.string().describe("Description of the NFT"),
		image: z.string().url().describe("Image URL of the NFT"),
		external_url: z.string().url().describe("External URL of the NFT"),
		attributes: z
			.array(
				z.object({
					trait_type: z.string().describe("Trait type of the NFT"),
					value: z.string().describe("Value of the trait"),
				})
			)
			.describe("Attributes of the NFT"),
	},
	async ({
		name,
		description,
		image,
		external_url,
		attributes,
	}: CreateNFTParams) => {
		try {
			const umi = createUmi(RPC_URL)
				.use(mplTokenMetadata())
				.use(irysUploader({ address: "https://devnet.irys.xyz" }));

			const NFTKeypair = generateSigner(umi);
			const userKeypair = createSignerFromKeypair(
				umi,
				fromWeb3JsKeypair(walletKeypair)
			);

			umi.use(signerIdentity(userKeypair));

			const metadata = {
				name,
				description,
				image,
				external_url,
				attributes,
				properties: {
					files: [
						{
							uri: image,
							type: "image/jpeg",
						},
					],
					category: "image",
				},
			};

			const metadataUri = await umi.uploader
				.uploadJson(metadata)
				.catch((err) => {
					throw new Error(err);
				});

			const tx = await createProgrammableNft(umi, {
				mint: NFTKeypair,
				sellerFeeBasisPoints: percentAmount(0),
				name: metadata.name,
				uri: metadataUri,
				ruleSet: null,
			}).sendAndConfirm(umi);

			const signature = base58.deserialize(tx.signature)[0];

			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(
							{
								message: "✅ Successfully created NFT",
								data: {
									signature,
									nftAddress: NFTKeypair.publicKey.toString(),
									metadataUri,
								},
							},
							null,
							2
						),
					},
				],
			};
		} catch (error) {
			console.error("Error in NFT creation:", error);
			return {
				content: [
					{
						type: "text",
						text: JSON.stringify(
							{
								message:
									"❌ Failed to create NFT. Please check the logs.",
								error:
									error instanceof Error
										? error.message
										: error,
							},
							null,
							2
						),
					},
				],
			};
		}
	}
);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
