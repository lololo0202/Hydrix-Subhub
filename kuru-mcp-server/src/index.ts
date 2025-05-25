import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";


import { KuruApiService } from './services/KuruApiService.js';
import { registerMcpTools } from './tools/mcpTools.js';

const server = new McpServer({
  name: "Kuru.io Crypto Exchange",
  version: "0.0.6"
});

const kuruApi = new KuruApiService();

registerMcpTools(server, kuruApi);

async function startStdioServer() {
  try {
    const transport = new StdioServerTransport();
    console.error("Starting Kuru MCP server with stdio transport...");
    
    await server.connect(transport);
    console.error("Server connected to stdio transport");
  } catch (error) {
    console.error("Error starting server with stdio transport:", error);
    process.exit(1);
  }
}

startStdioServer().catch(e => console.error("ERROR: ", e));
