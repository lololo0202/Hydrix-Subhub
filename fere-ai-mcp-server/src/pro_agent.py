import asyncio
import websockets
import json
import logging
from src.config import API_KEY, USER_ID

# Set up logging
logger = logging.getLogger("monk-mcp.pro_agent")

def get_pro_agent_response(message_text: str) -> str:
    """
    Function to get a response from the ProAgent via websocket.
    
    Args:
        message_text (str): The message to send to the agent
        
    Returns:
        str: The complete response from the agent
    """
    try:
        # Create a new event loop 
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        response = loop.run_until_complete(websocket_client(message_text, USER_ID, False))
        loop.close()
        return response
    except Exception as e:
        logger.error(f"Error connecting to ProAgent: {str(e)}")
        return f"Error: Failed to connect to ProAgent. {str(e)}"

async def websocket_client(message_text: str, user_id: str, stream: bool) -> str:
    """
    Async implementation of the ProAgent websocket client.
    """
    uri = f"wss://api.fereai.xyz/f/chat/v2/ws/{user_id}?X-FRIDAY-KEY={API_KEY}"
    
    try:
        async with websockets.connect(uri) as websocket:
            # Message to send
            message = {
                "message": message_text,
                "stream": stream,
                "agent": "ProAgent"
            }
            
            # Send the message
            await websocket.send(json.dumps(message))
            
            # Collect all responses
            collect_response = False
            final_response = ""
            while True:
                try:
                    response = await websocket.recv()
                    if collect_response:
                        try:
                            final_response = json.loads(response).get("answer", "") 
                        except:
                            final_response = response
                    # Check if this is the end of stream marker
                    if '{"chunk": "END_OF_STREAM"}' in response:
                        collect_response = True
                except websockets.exceptions.ConnectionClosed:
                    break
            
            return final_response
    except websockets.exceptions.WebSocketException as e:
        logger.error(f"WebSocket error: {str(e)}")
        return f"WebSocket error: {str(e)}"
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return f"Error: {str(e)}"

# Test the function if this file is run directly
if __name__ == "__main__":
    response = get_pro_agent_response("Hello what is the price of SOL?")
    print("Response Received",response)
