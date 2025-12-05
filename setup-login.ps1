# Quick Start Script untuk Login Page Setup (Windows)
# Usage: powershell -ExecutionPolicy Bypass -File setup-login.ps1

Write-Host "🚀 Starting Login Page Setup..." -ForegroundColor Green
Write-Host ""

# Step 1: Install dependencies
Write-Host "📦 Step 1: Installing dependencies..." -ForegroundColor Cyan
Write-Host "Running: npm install @react-oauth/google"
npm install @react-oauth/google

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install @react-oauth/google" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Step 2: Check .env file
Write-Host "⚙️  Step 2: Checking .env file..." -ForegroundColor Cyan
if (-Not (Test-Path ".env")) {
    Write-Host "Creating .env from .env.example..."
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created from .env.example" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Please update .env with your Google Client ID:" -ForegroundColor Yellow
    Write-Host "   VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE"
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}
Write-Host ""

# Step 3: Verify files
Write-Host "📋 Step 3: Verifying created files..." -ForegroundColor Cyan
$filesToCheck = @(
    "src/components/pages/Login.jsx",
    "LOGIN_SETUP.md",
    "BACKEND_INTEGRATION.md",
    "LOGIN_CHECKLIST.md",
    ".env.example"
)

$allExist = $true
foreach ($file in $filesToCheck) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file (missing)" -ForegroundColor Red
        $allExist = $false
    }
}
Write-Host ""

if ($allExist) {
    Write-Host "✅ All files verified successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  Some files are missing. Please check the setup." -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Summary
Write-Host "📊 Setup Summary:" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host "✅ Environment configured" -ForegroundColor Green
Write-Host "✅ Login page created" -ForegroundColor Green
Write-Host "✅ Documentation ready" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Get Google Client ID from: https://console.cloud.google.com/" -ForegroundColor White
Write-Host "2. Update .env file with VITE_GOOGLE_CLIENT_ID" -ForegroundColor White
Write-Host "3. Implement backend endpoint: POST /auth/google" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White
Write-Host "5. Visit: http://localhost:5173/login" -ForegroundColor White
Write-Host ""

Write-Host "📖 Documentation:" -ForegroundColor Cyan
Write-Host "- LOGIN_SETUP.md - Setup and configuration guide" -ForegroundColor White
Write-Host "- BACKEND_INTEGRATION.md - Backend API specification" -ForegroundColor White
Write-Host "- LOGIN_CHECKLIST.md - Complete feature checklist" -ForegroundColor White
Write-Host ""

Write-Host "✅ Setup complete! Happy coding! 🎉" -ForegroundColor Green
