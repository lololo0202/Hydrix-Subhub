from typing import Any, Dict, List, Optional, Union
from mcp.server.fastmcp import FastMCP

from src.config import MCP_NAME, MCP_TRANSPORT
from src.agent import (
    create_agent, update_agent, delete_agent, get_agent, get_agents_by_user,
    get_agent_portfolio, get_agent_holdings, get_agent_trades, get_agent_decisions,
    get_agent_calls, buy_token, sell_token, sync_agent, get_all_agents,
    add_parent_to_agent, remove_parent_from_agent, get_agents_by_telegram_id,
    get_agent_buy_recommendation, get_task_status, get_wallet_details, 
    get_tg_wallet_details
)
from src.pro_agent import get_pro_agent_response

# Initialize FastMCP server
mcp = FastMCP(MCP_NAME)

# Register API endpoints as tools
@mcp.tool()
async def create_trading_agent(
    name: str, 
    prompt: str, 
    network: str = "SOLANA", 
    max_investment_per_session: float = 0.1, 
    stop_loss: float = 0.05, 
    take_profit: float = 0.2,
    dry_run: bool = True
) -> Dict[str, Any]:
    """Create a new trading agent.

    Args:
        name: Name of the agent
        prompt: Instructions for the agent
        network: Blockchain network (SOLANA, BASE, or ARBITRUM)
        max_investment_per_session: Maximum investment per session (0-1)
        stop_loss: Stop loss percentage (0-1)
        take_profit: Take profit percentage (0-1)
        dry_run: Enable simulation mode
    """
    return await create_agent(
        name, prompt, network, max_investment_per_session, 
        stop_loss, take_profit, dry_run
    )

@mcp.tool()
async def get_all_trading_agents() -> Dict[str, Any]:
    """Get all available trading agents."""
    return await get_all_agents()

@mcp.tool()
async def update_trading_agent(
    agent_id: str, 
    name: Optional[str] = None, 
    prompt: Optional[str] = None, 
    max_investment_per_session: Optional[float] = None, 
    stop_loss: Optional[float] = None, 
    take_profit: Optional[float] = None,
    dry_run: Optional[bool] = None
) -> Dict[str, Any]:
    """Update an existing trading agent.

    Args:
        agent_id: UUID of the agent to update
        name: New name for the agent
        prompt: New instructions for the agent
        max_investment_per_session: New maximum investment per session (0-1)
        stop_loss: New stop loss percentage (0-1)
        take_profit: New take profit percentage (0-1)
        dry_run: Enable/disable simulation mode
    """
    return await update_agent(
        agent_id, name, prompt, max_investment_per_session, 
        stop_loss, take_profit, dry_run
    )

@mcp.tool()
async def add_parent_agent(agent_id: str, parent_id: str) -> Dict[str, Any]:
    """Add a parent agent to an agent.
    
    Args:
        agent_id: UUID of the agent
        parent_id: UUID of the parent agent to add
    """
    return await add_parent_to_agent(agent_id, parent_id)

@mcp.tool()
async def remove_parent_agent(agent_id: str, parent_id: str) -> Dict[str, Any]:
    """Remove a parent agent from an agent.
    
    Args:
        agent_id: UUID of the agent
        parent_id: UUID of the parent agent to remove
    """
    return await remove_parent_from_agent(agent_id, parent_id)

@mcp.tool()
async def delete_trading_agent(agent_id: str) -> Dict[str, Any]:
    """Delete a trading agent.

    Args:
        agent_id: UUID of the agent to delete
    """
    return await delete_agent(agent_id)

@mcp.tool()
async def get_trading_agent(agent_id: str) -> Dict[str, Any]:
    """Get details of a trading agent.

    Args:
        agent_id: UUID of the agent
    """
    return await get_agent(agent_id)

@mcp.tool()
async def get_user_agents(user_id: str) -> Dict[str, Any]:
    """Get all trading agents for a specific user.

    Args:
        user_id: ID of the user
    """
    return await get_agents_by_user(user_id)

@mcp.tool()
async def get_telegram_user_agents(tg_id: str) -> Dict[str, Any]:
    """Get all trading agents for a Telegram user.
    
    Args:
        tg_id: Telegram user ID
    """
    return await get_agents_by_telegram_id(tg_id)

@mcp.tool()
async def get_agent_portfolio_info(agent_id: str) -> Dict[str, Any]:
    """Get portfolio details of a trading agent.

    Args:
        agent_id: UUID of the agent
    """
    return await get_agent_portfolio(agent_id)

@mcp.tool()
async def get_agent_token_holdings(agent_id: str) -> Dict[str, Any]:
    """Get token holdings of a trading agent.

    Args:
        agent_id: UUID of the agent
    """
    return await get_agent_holdings(agent_id)

@mcp.tool()
async def get_agent_trade_history(agent_id: str) -> Dict[str, Any]:
    """Get trade history of a trading agent.

    Args:
        agent_id: UUID of the agent
    """
    return await get_agent_trades(agent_id)

@mcp.tool()
async def get_buy_recommendations(agent_id: str) -> Dict[str, Any]:
    """Get buy recommendations for a trading agent.
    
    Args:
        agent_id: UUID of the agent
    """
    return await get_agent_buy_recommendation(agent_id)

@mcp.tool()
async def get_agent_decision_history(agent_id: str) -> Dict[str, Any]:
    """Get trading decisions made by an agent.

    Args:
        agent_id: UUID of the agent
    """
    return await get_agent_decisions(agent_id)

@mcp.tool()
async def get_agent_call_history(agent_id: str) -> Dict[str, Any]:
    """Get calls made by an agent.

    Args:
        agent_id: UUID of the agent
    """
    return await get_agent_calls(agent_id)

@mcp.tool()
async def get_trading_task_status(task_id: str) -> Dict[str, Any]:
    """Get the status of a trading task.
    
    Args:
        task_id: UUID of the task
    """
    return await get_task_status(task_id)

@mcp.tool()
async def get_agent_wallet(agent_id: str) -> Dict[str, Any]:
    """Get wallet details of a trading agent.
    
    Args:
        agent_id: UUID of the agent
    """
    return await get_wallet_details(agent_id)

@mcp.tool()
async def get_telegram_user_wallet(tg_id: str) -> Dict[str, Any]:
    """Get wallet details of a Telegram user.
    
    Args:
        tg_id: Telegram user ID
    """
    return await get_tg_wallet_details(tg_id)

@mcp.tool()
async def execute_buy_order(agent_id: str, ca: str, amount_usd: float) -> Dict[str, Any]:
    """Execute a buy order for a token.

    Args:
        agent_id: UUID of the agent
        ca: Contract address of the token
        amount_usd: Amount in USD to buy
    """
    return await buy_token(agent_id, ca, amount_usd)

@mcp.tool()
async def execute_sell_order(agent_id: str, ca: str, quantity: float) -> Dict[str, Any]:
    """Execute a sell order for a token.

    Args:
        agent_id: UUID of the agent
        ca: Contract address of the token
        quantity: Quantity of tokens to sell
    """
    return await sell_token(agent_id, ca, quantity)

@mcp.tool()
async def sync_agent_state(agent_id: str) -> Dict[str, Any]:
    """Synchronize agent state with blockchain.

    Args:
        agent_id: UUID of the agent
    """
    return await sync_agent(agent_id)

@mcp.tool()
async def get_pro_agent_reply(message: str) -> Dict[str, Any]:
    """Get a response from the ProAgent.
    
    Args:
        message: The message to send to the ProAgent
    """
    try:
        # Use asyncio.to_thread to run the synchronous function in a separate thread
        # This prevents blocking the event loop when calling run_until_complete inside get_pro_agent_response
        import asyncio
        response = await asyncio.to_thread(get_pro_agent_response, message)
        return {"response": response, "status": "success"}
    except Exception as e:
        return {"error": str(e), "status": "error"}

if __name__ == "__main__":
    # Initialize and run the server
    mcp.run(transport=MCP_TRANSPORT)