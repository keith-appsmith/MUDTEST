#!/bin/bash

# Idle RPG Game Launcher
# This script starts a simple HTTP server to run the game locally

echo "=== Idle RPG Game Launcher ==="
echo "Starting local server on port 8000..."

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Try to launch with Python 3 first
if command -v python3 &>/dev/null; then
    echo "Using Python 3 to serve the game"
    python3 -m http.server 8000
# Fall back to Python 2 if Python 3 is not available
elif command -v python &>/dev/null; then
    echo "Using Python 2 to serve the game"
    python -m SimpleHTTPServer 8000
# If neither Python version is available, show an error
else
    echo "Error: Python is not installed or not in your PATH"
    echo "Please install Python or use another HTTP server to run the game"
    exit 1
fi

# This part will only execute if the server is stopped
echo "Server stopped"
