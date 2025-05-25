import { config } from "dotenv";
import logger from "./utils/logger.js";
import { ServerMode } from "./types.js";
import { LightningServer } from "./server.js";

// Load environment variables
config();

/**
 * Validates environment variables and starts the Nostr MCP server
 */
async function main() {
  // Get configuration from environment
  const lnbitsUrl = process.env.LNBITS_URL;
  const adminKey = process.env.LNBITS_ADMIN_KEY;
  const readKey = process.env.LNBITS_READ_KEY;
  const mode =
    (process.env.MODE?.toLowerCase() as ServerMode) || ServerMode.STDIN;
  const port = parseInt(process.env.PORT || "3000", 10);

  // Validate required environment variables
  if (!lnbitsUrl) {
    logger.error("LNBITS_URL environment variable is required");
    process.exit(1);
  }
  if (!adminKey) {
    logger.error("LNBITS_ADMIN_KEY environment variable is required");
    process.exit(1);
  }
  if (!readKey) {
    logger.error("LNBITS_READ_KEY environment variable is required");
    process.exit(1);
  }

  try {
    // Create and start the server
    const server = new LightningServer(
      { lnbitsUrl, adminKey, readKey },
      { mode, port },
    );
    await server.start();
  } catch (error) {
    console.error(error);
    logger.error({ error }, "Failed to start server");
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  logger.error({ error }, "Unhandled error");
  process.exit(1);
});
