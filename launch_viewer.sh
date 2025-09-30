#!/bin/bash

# OpenEHR Archetype Viewer Launcher
# This script starts a local web server and opens the archetype viewer

echo "🏥 OpenEHR Archetype Viewer"
echo "=============================="
echo ""

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 to continue."
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if viewer.html exists
if [ ! -f "viewer.html" ]; then
    echo "❌ viewer.html not found in the current directory"
    exit 1
fi

# Find an available port
PORT=8000
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; do
    PORT=$((PORT+1))
done

echo "✅ Starting web server on port $PORT..."
echo ""
echo "📂 Serving files from: $SCRIPT_DIR"
echo "🌐 Viewer URL: http://localhost:$PORT/viewer.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=============================="
echo ""

# Start the server in the background
python3 -m http.server $PORT &
SERVER_PID=$!

# Wait a moment for the server to start
sleep 2

# Open the browser
if command -v open &> /dev/null; then
    # macOS
    open "http://localhost:$PORT/viewer.html"
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open "http://localhost:$PORT/viewer.html"
elif command -v start &> /dev/null; then
    # Windows (Git Bash)
    start "http://localhost:$PORT/viewer.html"
else
    echo "⚠️  Could not automatically open browser"
    echo "Please manually open: http://localhost:$PORT/viewer.html"
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping web server..."
    kill $SERVER_PID 2>/dev/null
    echo "✅ Server stopped. Goodbye!"
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup INT TERM

# Wait for the server process
wait $SERVER_PID
