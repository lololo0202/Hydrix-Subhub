import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Configuration
MONK_API_BASE = os.getenv("MONK_API_BASE", "https://api.fereai.xyz/ta")
ORIGIN = os.getenv("ORIGIN", "monk-mcp/1.0")
API_KEY = os.getenv("API_KEY")
USER_ID = os.getenv("USER_ID")
REQUEST_TIMEOUT = float(os.getenv("REQUEST_TIMEOUT", "30.0"))

# Server Configuration
MCP_NAME = os.getenv("MCP_NAME", "0xMONK")
MCP_TRANSPORT = os.getenv("MCP_TRANSPORT", "stdio") 