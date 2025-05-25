#!/usr/bin/env python3
"""
0xMONK MCP Server Entry Point

This script starts the MCP server for the 0xMONK API.
"""
import logging
import os
import argparse
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import after environment variables are loaded
from src.main import mcp

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("monk-mcp")

def main():
    """Run the 0xMONK MCP server."""
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Run the 0xMONK MCP server')
    parser.add_argument('--run_type', type=str, default='stdio', choices=['stdio', 'sse'],
                        help='Transport type: stdio or http (default: stdio)')
    args = parser.parse_args()

    logger.info(f"Starting 0xMONK MCP server with {args.run_type} transport...")

    # Set API key from environment
    api_key = os.getenv("API_KEY")
    if not api_key:
        logger.warning("API_KEY not set in environment variables")

    # Run the server with the specified transport
    if args.run_type not in ['stdio', 'sse']:
        logger.error(f"Invalid run_type: {args.run_type}. Must be 'stdio' or 'sse'.")
        return

    mcp.run(transport=args.run_type)

if __name__ == "__main__":
    main()