from typing import Any, Dict, List, Optional, Union
from src.config import MONK_API_BASE
from src.utils import make_monk_request

async def create_agent(name: str, prompt: str, network: str = "SOLANA", 
                       max_investment_per_session: float = 0.1, 
                       stop_loss: float = 0.05, 
                       take_profit: float = 0.2,
                       dry_run: bool = True) -> Dict[str, Any]:
    """Create a new trading agent."""
    url = f"{MONK_API_BASE}/agent/"
    payload = {
        "name": name,
        "prompt": prompt,
        "network": network,
        "max_investment_per_session": max_investment_per_session,
        "stop_loss": stop_loss,
        "take_profit": take_profit,
        "dry_run": dry_run
    }
    
    return await make_monk_request(url, method="PUT", json_data=payload)

async def get_all_agents() -> Dict[str, Any]:
    """Get all available agents."""
    url = f"{MONK_API_BASE}/hero-agents/"
    return await make_monk_request(url)

async def update_agent(agent_id: str, name: Optional[str] = None, prompt: Optional[str] = None, 
                      max_investment_per_session: Optional[float] = None, 
                      stop_loss: Optional[float] = None, 
                      take_profit: Optional[float] = None,
                      dry_run: Optional[bool] = None) -> Dict[str, Any]:
    """Update an existing trading agent."""
    url = f"{MONK_API_BASE}/agent/{agent_id}/"
    payload = {}
    
    if name is not None:
        payload["name"] = name
    if prompt is not None:
        payload["prompt"] = prompt
    if max_investment_per_session is not None:
        payload["max_investment_per_session"] = max_investment_per_session
    if stop_loss is not None:
        payload["stop_loss"] = stop_loss
    if take_profit is not None:
        payload["take_profit"] = take_profit
    if dry_run is not None:
        payload["dry_run"] = dry_run
    
    return await make_monk_request(url, method="PATCH", json_data=payload)

async def add_parent_to_agent(agent_id: str, parent_id: str) -> Dict[str, Any]:
    """Add a parent agent to an agent."""
    url = f"{MONK_API_BASE}/agent/parents/{agent_id}/"
    payload = {
        "parent_id": parent_id
    }
    return await make_monk_request(url, method="PUT", json_data=payload)

async def remove_parent_from_agent(agent_id: str, parent_id: str) -> Dict[str, Any]:
    """Remove a parent agent from an agent."""
    url = f"{MONK_API_BASE}/agent/parents/{agent_id}/"
    payload = {
        "parent_id": parent_id
    }
    return await make_monk_request(url, method="DELETE", json_data=payload)

async def delete_agent(agent_id: str) -> Dict[str, Any]:
    """Delete a trading agent."""
    url = f"{MONK_API_BASE}/agent/{agent_id}/"
    return await make_monk_request(url, method="DELETE")

async def get_agent(agent_id: str) -> Dict[str, Any]:
    """Get details of a trading agent."""
    url = f"{MONK_API_BASE}/agent/{agent_id}"
    return await make_monk_request(url)

async def get_agents_by_user(user_id: str) -> Dict[str, Any]:
    """Get all agents for a specific user."""
    url = f"{MONK_API_BASE}/agent/user/{user_id}/"
    return await make_monk_request(url)

async def get_agents_by_telegram_id(tg_id: str) -> Dict[str, Any]:
    """Get all agents for a specific Telegram user."""
    url = f"{MONK_API_BASE}/agent/tg"
    headers = {"x-auth-tg-userid": tg_id}
    return await make_monk_request(url, headers=headers)

async def get_agent_portfolio(agent_id: str) -> Dict[str, Any]:
    """Get portfolio details of a trading agent."""
    url = f"{MONK_API_BASE}/agent/portfolio/{agent_id}/"
    return await make_monk_request(url)

async def get_agent_holdings(agent_id: str) -> Dict[str, Any]:
    """Get token holdings of a trading agent."""
    url = f"{MONK_API_BASE}/agent/holdings/{agent_id}/"
    return await make_monk_request(url)

async def get_agent_buy_recommendation(agent_id: str) -> Dict[str, Any]:
    """Get buy recommendations for a trading agent."""
    url = f"{MONK_API_BASE}/agent/recommend/buy/{agent_id}/"
    return await make_monk_request(url)

async def get_agent_trades(agent_id: str) -> Dict[str, Any]:
    """Get trade history of a trading agent."""
    url = f"{MONK_API_BASE}/agent/trades/{agent_id}/"
    return await make_monk_request(url)

async def get_agent_decisions(agent_id: str) -> Dict[str, Any]:
    """Get trading decisions made by an agent."""
    url = f"{MONK_API_BASE}/agent/decisions/{agent_id}/"
    return await make_monk_request(url)

async def get_agent_calls(agent_id: str) -> Dict[str, Any]:
    """Get calls made by an agent."""
    url = f"{MONK_API_BASE}/agent/calls/{agent_id}/"
    return await make_monk_request(url)

async def get_task_status(task_id: str) -> Dict[str, Any]:
    """Get the status of a trading task."""
    url = f"{MONK_API_BASE}/task/{task_id}/"
    return await make_monk_request(url)

async def get_wallet_details(agent_id: str) -> Dict[str, Any]:
    """Get wallet details of a trading agent."""
    url = f"{MONK_API_BASE}/wallet/{agent_id}/"
    return await make_monk_request(url)

async def get_tg_wallet_details(tg_id: str) -> Dict[str, Any]:
    """Get wallet details of a Telegram user."""
    url = f"{MONK_API_BASE}/wallet/tg/"
    headers = {"x-auth-tg-userid": tg_id}
    return await make_monk_request(url, headers=headers)

async def buy_token(agent_id: str, ca: str, amount_usd: float) -> Dict[str, Any]:
    """Execute a buy order for a token."""
    url = f"{MONK_API_BASE}/agent/buy/{agent_id}/"
    payload = {
        "ca": ca,
        "amount_usd": amount_usd
    }
    
    return await make_monk_request(url, method="POST", json_data=payload)

async def sell_token(agent_id: str, ca: str, quantity: float) -> Dict[str, Any]:
    """Execute a sell order for a token."""
    url = f"{MONK_API_BASE}/agent/sell/{agent_id}/{ca}/{quantity}/"
    return await make_monk_request(url, method="POST")

async def sync_agent(agent_id: str) -> Dict[str, Any]:
    """Synchronize agent state with blockchain."""
    url = f"{MONK_API_BASE}/agent/sync/{agent_id}/"
    return await make_monk_request(url, method="POST") 