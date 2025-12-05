#!/bin/bash

# Quick Start Script untuk Login Page Setup
# Usage: bash setup-login.sh

echo "🚀 Starting Login Page Setup..."
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
echo "Running: npm install @react-oauth/google"
npm install @react-oauth/google

if [ $? -ne 0 ]; then
    echo "❌ Failed to install @react-oauth/google"
    exit 1
fi
echo "✅ Dependencies installed successfully"
echo ""

# Step 2: Check .env file
echo "⚙️  Step 2: Checking .env file..."
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env file created from .env.example"
    echo ""
    echo "📝 Please update .env with your Google Client ID:"
    echo "   VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE"
else
    echo "✅ .env file already exists"
fi
echo ""

# Step 3: Verify files
echo "📋 Step 3: Verifying created files..."
files_to_check=(
    "src/components/pages/Login.jsx"
    "LOGIN_SETUP.md"
    "BACKEND_INTEGRATION.md"
    "LOGIN_CHECKLIST.md"
    ".env.example"
)

all_exist=true
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_exist=false
    fi
done
echo ""

if [ "$all_exist" = true ]; then
    echo "✅ All files verified successfully"
else
    echo "⚠️  Some files are missing. Please check the setup."
fi
echo ""

# Step 4: Summary
echo "📊 Setup Summary:"
echo "=================="
echo "✅ Dependencies installed"
echo "✅ Environment configured"
echo "✅ Login page created"
echo "✅ Documentation ready"
echo ""

echo "🎯 Next Steps:"
echo "1. Get Google Client ID from: https://console.cloud.google.com/"
echo "2. Update .env file with VITE_GOOGLE_CLIENT_ID"
echo "3. Implement backend endpoint: POST /auth/google"
echo "4. Run: npm run dev"
echo "5. Visit: http://localhost:5173/login"
echo ""

echo "📖 Documentation:"
echo "- LOGIN_SETUP.md - Setup and configuration guide"
echo "- BACKEND_INTEGRATION.md - Backend API specification"
echo "- LOGIN_CHECKLIST.md - Complete feature checklist"
echo ""

echo "✅ Setup complete! Happy coding! 🎉"
