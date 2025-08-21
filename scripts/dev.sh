#!/bin/bash

# AriaForge Development Script
# This script starts both the frontend and backend in development mode

set -e

echo "🎵 Starting AriaForge Development Environment..."

# Check if required tools are installed
check_requirements() {
    echo "🔍 Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        echo "❌ Python 3 is not installed. Please install Python 3.11+"
        exit 1
    fi
    
    if ! command -v pip &> /dev/null; then
        echo "❌ pip is not installed. Please install pip"
        exit 1
    fi
    
    echo "✅ Requirements check passed"
}

# Setup frontend
setup_frontend() {
    echo "🎨 Setting up frontend..."
    
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        npm install
    fi
    
    echo "✅ Frontend setup complete"
}

# Setup backend
setup_backend() {
    echo "🔧 Setting up backend..."
    
    cd backend
    
    if [ ! -d "venv" ]; then
        echo "🐍 Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    echo "📦 Installing backend dependencies..."
    source venv/bin/activate
    pip install -r requirements.txt
    
    cd ..
    echo "✅ Backend setup complete"
}

# Start services
start_services() {
    echo "🚀 Starting services..."
    
    # Start backend in background
    echo "🔧 Starting backend server..."
    cd backend
    source venv/bin/activate
    python main.py &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    echo "⏳ Waiting for backend to start..."
    sleep 5
    
    # Start frontend
    echo "🎨 Starting frontend server..."
    npm run dev &
    FRONTEND_PID=$!
    
    echo "✅ Services started!"
    echo "📱 Frontend: http://localhost:3000"
    echo "🔧 Backend: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    
    # Wait for user to stop
    echo ""
    echo "Press Ctrl+C to stop all services"
    
    # Trap to cleanup on exit
    trap cleanup EXIT
    
    # Wait for background processes
    wait
}

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    
    echo "✅ Services stopped"
    exit 0
}

# Main execution
main() {
    check_requirements
    setup_frontend
    setup_backend
    start_services
}

# Run main function
main "$@"
