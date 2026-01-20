#!/bin/bash

# Deployment script for Ticketing Platform
# This script helps deploy smart contracts and configure the frontend

set -e

echo "🎫 Ticketing Platform Deployment Script"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if Sui CLI is installed
if ! command -v sui &> /dev/null; then
    print_error "Sui CLI is not installed"
    echo "Please install Sui CLI: https://docs.sui.io/build/install"
    exit 1
fi

print_status "Sui CLI found"

# Check current directory
if [ ! -f "move/ticketing_platform/Move.toml" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Project structure verified"

# Build Move contracts
echo ""
echo "📦 Building Move contracts..."
cd move/ticketing_platform

if sui move build; then
    print_status "Move contracts built successfully"
else
    print_error "Failed to build Move contracts"
    exit 1
fi

# Run tests
echo ""
echo "🧪 Running tests..."
if sui move test; then
    print_status "All tests passed"
else
    print_warning "Some tests failed, but continuing..."
fi

# Deploy contracts
echo ""
echo "🚀 Deploying contracts to testnet..."
print_warning "Make sure you have testnet SUI tokens in your wallet"
read -p "Continue with deployment? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    DEPLOY_OUTPUT=$(sui client publish --gas-budget 100000000 2>&1)
    
    if echo "$DEPLOY_OUTPUT" | grep -q "Transaction Digest"; then
        print_status "Contracts deployed successfully!"
        
        # Extract package ID
        PACKAGE_ID=$(echo "$DEPLOY_OUTPUT" | grep -oP 'Created Objects:.*?ID: \K0x[a-f0-9]+' | head -1)
        
        if [ -n "$PACKAGE_ID" ]; then
            echo ""
            echo "📝 Package ID: $PACKAGE_ID"
            
            # Update frontend .env.local
            cd ../../frontend
            if [ -f ".env.local" ]; then
                sed -i "s/NEXT_PUBLIC_PACKAGE_ID=.*/NEXT_PUBLIC_PACKAGE_ID=$PACKAGE_ID/" .env.local
                print_status "Updated frontend .env.local with package ID"
            else
                cp .env.example .env.local
                sed -i "s/NEXT_PUBLIC_PACKAGE_ID=.*/NEXT_PUBLIC_PACKAGE_ID=$PACKAGE_ID/" .env.local
                print_status "Created .env.local with package ID"
            fi
            
            echo ""
            echo "✅ Deployment complete!"
            echo ""
            echo "Next steps:"
            echo "1. cd frontend"
            echo "2. npm install"
            echo "3. npm run dev"
            echo ""
            echo "📋 Save this Package ID: $PACKAGE_ID"
        else
            print_warning "Could not extract package ID from deployment output"
        fi
    else
        print_error "Deployment failed"
        echo "$DEPLOY_OUTPUT"
        exit 1
    fi
else
    print_warning "Deployment cancelled"
fi

cd ../..
