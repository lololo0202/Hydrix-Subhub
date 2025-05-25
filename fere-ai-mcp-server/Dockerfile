# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install uv package manager
RUN apt-get update && \
    apt-get install -y curl && \
    curl -LsSf https://astral.sh/uv/install.sh | sh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add uv to PATH
ENV PATH="/root/.cargo/bin:${PATH}"

# Copy requirements and install dependencies
COPY requirements.txt .
RUN uv pip install -r requirements.txt

# Copy application code
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

# Set entrypoint to run the MCP server in SSE mode
CMD ["python", "main.py", "--run_type", "sse"]