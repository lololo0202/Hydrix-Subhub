from typing import Any, Dict, Optional
import httpx
from src.config import API_KEY, ORIGIN, REQUEST_TIMEOUT

async def make_monk_request(
    url: str, method: str = "GET", headers: Optional[Dict] = None, json_data: Optional[Dict] = None
) -> Dict[str, Any]:
    """Make a request to the 0xMONK API with proper error handling.
    
    Args:
        url: The URL to make the request to
        method: HTTP method (GET, PUT, PATCH, DELETE, POST)
        headers: Optional HTTP headers
        json_data: Optional JSON data for request body
        
    Returns:
        Dictionary containing the response JSON or error information
    """
    if headers is None:
        headers = {}
    
    headers.update({
        "Origin": ORIGIN,
        "Accept": "application/json",
        "X-FRIDAY-KEY": API_KEY,
    })
    
    async with httpx.AsyncClient() as client:
        try:
            if method == "GET":
                response = await client.get(url, headers=headers, timeout=REQUEST_TIMEOUT)
            elif method == "PUT":
                response = await client.put(url, headers=headers, json=json_data, timeout=REQUEST_TIMEOUT)
            elif method == "PATCH":
                response = await client.patch(url, headers=headers, json=json_data, timeout=REQUEST_TIMEOUT)
            elif method == "DELETE":
                response = await client.delete(url, headers=headers, timeout=REQUEST_TIMEOUT)
            elif method == "POST":
                response = await client.post(url, headers=headers, json=json_data, timeout=REQUEST_TIMEOUT)
            else:
                return {"error": f"Unsupported HTTP method: {method}"}
                
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            return {
                "error": f"HTTP error: {e.response.status_code}",
                "message": str(e)
            }
        except httpx.RequestError as e:
            return {"error": f"Request failed: {str(e)}"}
        except Exception as e:
            return {"error": str(e)} 