import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
  ErrorCode,
  McpError,
  TextContent,
} from "@modelcontextprotocol/sdk/types.js";
import {
  Config,
  ConfigSchema,
  LightningError,
  PayInvoiceSchema,
  ServerConfig,
} from "./types.js";
import logger from "./utils/logger.js";
import express from "express";
import { LNBitsClient } from "./lnbits_client.js";
const SERVER_NAME = "nostr-mcp";
const SERVER_VERSION = "0.0.1";

/**
 * NostrServer implements a Model Context Protocol server for Nostr
 * It provides tools for interacting with the Nostr network, such as posting notes
 */
export class LightningServer {
  private server: Server;
  private client: LNBitsClient;
  private transport?: SSEServerTransport;
  private app: express.Application;

  constructor(config: Config, serverConfig: ServerConfig) {
    // Validate configuration using Zod schema
    const result = ConfigSchema.safeParse(config);
    if (!result.success) {
      throw new Error(`Invalid configuration: ${result.error.message}`);
    }

    // Initialize Nostr client and MCP server
    this.client = new LNBitsClient(
      config.lnbitsUrl,
      config.adminKey,
      config.readKey,
    );
    this.server = new Server(
      {
        name: SERVER_NAME,
        version: SERVER_VERSION,
      },
      {
        capabilities: {
          tools: {},
        },
      },
    );
    this.app = express();

    // Initialize transport based on mode
    this.app.get("/sse", async (req, res) => {
      this.transport = new SSEServerTransport("/messages", res);
      await this.server.connect(this.transport);
    });

    this.app.post("/messages", async (req, res) => {
      if (!this.transport) {
        res.status(400).json({ error: "No active SSE connection" });
        return;
      }
      await this.transport.handlePostMessage(req, res);
    });

    this.app.listen(serverConfig.port, () => {
      logger.info(`SSE Server listening on port ${serverConfig.port}`);
    });

    this.setupHandlers();
  }

  /**
   * Sets up error and signal handlers for the server
   */
  private setupHandlers(): void {
    // Log MCP errors
    this.server.onerror = (error) => {
      logger.error({ error }, "MCP Server Error");
    };

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      await this.shutdown();
    });

    process.on("SIGTERM", async () => {
      await this.shutdown();
    });

    // Handle uncaught errors
    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception", error);
      this.shutdown(1);
    });

    process.on("unhandledRejection", (reason) => {
      logger.error("Unhandled Rejection", reason);
      this.shutdown(1);
    });

    this.setupToolHandlers();
  }

  private async shutdown(code = 0): Promise<never> {
    logger.info("Shutting down server...");
    try {
      logger.info("Server shutdown complete");
      process.exit(code);
    } catch (error) {
      logger.error({ error }, "Error during shutdown");
      process.exit(1);
    }
  }

  /**
   * Registers available tools with the MCP server
   */
  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "pay_invoice",
          description: "Pay an invoice on Lightning Network",
          inputSchema: {
            type: "object",
            properties: {
              invoice: {
                type: "string",
                description: "The invoice to pay",
              },
            },
            required: ["invoice"],
          },
        } as Tool,
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      logger.debug({ name, args }, "Tool called");

      try {
        switch (name) {
          case "pay_invoice":
            return await this.handlePayInvoice(args);
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`,
            );
        }
      } catch (error) {
        return this.handleError(error);
      }
    });
  }

  /**
   * Handles the post_note tool execution
   * @param args - Tool arguments containing note content
   */
  private async handlePayInvoice(args: unknown) {
    const result = PayInvoiceSchema.safeParse(args);
    if (!result.success) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid parameters: ${result.error.message}`,
      );
    }

    const invoice = await this.payInvoice(result.data.invoice);
    return {
      content: [
        {
          type: "text",
          text: `Invoice paid successfully!`,
        },
      ] as TextContent[],
    };
  }

  async payInvoice(invoice: string): Promise<{ status: string }> {
    console.log(`Received bolt11 invoice: ${invoice}`);
    const decodedInvoice = this.client.toHumanFriendlyInvoice(invoice);
    console.log(`Decoded invoice: ${JSON.stringify(decodedInvoice)}`);

    try {
      await this.client.sendPayment(invoice);
      console.log("Invoice paid successfully");
      return {
        status: "success",
      };
    } catch (error) {
      console.error(error);
      throw new Error(`Pay invoice failed: ${error}`);
    }
  }

  /**
   * Handles errors during tool execution
   * @param error - The error to handle
   */
  private handleError(error: unknown) {
    if (error instanceof McpError) {
      throw error;
    }

    if (error instanceof LightningError) {
      return {
        content: [
          {
            type: "text",
            text: `Lightning error: ${error}`,
            isError: true,
          },
        ] as TextContent[],
      };
    }

    logger.error({ error }, "Unexpected error");
    throw new McpError(ErrorCode.InternalError, "An unexpected error occurred");
  }

  /**
   * Starts the MCP server
   */
  async start(): Promise<void> {
    logger.info({ mode: "sse" }, "Lightning MCP server running");
  }
}
