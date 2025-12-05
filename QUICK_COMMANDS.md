# 🚀 Quick Commands Reference

Copy-paste ready commands untuk setup dan test.

## 📦 Installation

### Option 1: Manual (Recommended)
```bash
# Navigate to frontend folder
cd frontend-peminjaman

# Install Google OAuth package
npm install @react-oauth/google

# Verify installation
npm list @react-oauth/google
```

### Option 2: Automated (Linux/Mac)
```bash
cd frontend-peminjaman
bash setup-login.sh
```

### Option 3: Automated (Windows)
```powershell
cd frontend-peminjaman
powershell -ExecutionPolicy Bypass -File setup-login.ps1
```

---

## 🔧 Environment Setup

### Create .env file
```bash
# Linux/Mac
echo "VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE" > .env

# Windows PowerShell
Add-Content -Path .env -Value "VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE"

# Or manually:
# 1. Create file: frontend-peminjaman/.env
# 2. Add line: VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
```

### Get Google Client ID
1. Go to: https://console.cloud.google.com/
2. Create new project or select existing
3. Enable "Google+ API"
4. Create OAuth 2.0 Credentials:
   - Type: Web Application
   - Authorized JS origins: http://localhost:5173
   - Authorized redirect URIs: http://localhost:5173
5. Copy "Client ID"
6. Paste in .env file

---

## 🧪 Development

### Start Development Server
```bash
cd frontend-peminjaman
npm run dev

# Output: Local: http://localhost:5173/
```

### Access Login Page
```
http://localhost:5173/login
```

### View Console Logs
```bash
# Browser Console (F12 or Right Click > Inspect > Console)
# Look for: "User logged in: [name]"
```

### Test Google Sign-In
```
1. Click "Sign in with Google"
2. Select Google account
3. Check:
   - Console for user name log
   - Network tab for POST /auth/google
   - Redirect to /admin or /dashboard
```

---

## 🔍 Debugging

### Check Installation
```bash
npm list @react-oauth/google
npm list axios
npm list framer-motion
npm list react-router-dom
```

### Check Environment Variable
```bash
# Linux/Mac
echo $VITE_GOOGLE_CLIENT_ID

# Windows PowerShell
$env:VITE_GOOGLE_CLIENT_ID
```

### Check File Exists
```bash
# Linux/Mac
ls -la src/components/pages/Login.jsx
cat .env

# Windows PowerShell
Test-Path src/components/pages/Login.jsx
Get-Content .env
```

### Clear Cache & Reinstall
```bash
# Remove node_modules
rm -rf node_modules
# or
rmdir /s /q node_modules  # Windows

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
npm install @react-oauth/google
```

---

## 📝 Backend Testing

### Test Backend Endpoint (cURL)
```bash
curl -X POST http://localhost:8080/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ..."}'
```

### Test with Postman
```
Method: POST
URL: http://localhost:8080/auth/google
Headers:
  Content-Type: application/json
Body (JSON):
{
  "token": "your_jwt_token_here"
}

Expected Response:
{
  "role": "admin",
  "name": "John Doe"
}
```

### Enable Cookies in Postman
```
1. Settings (⚙️)
2. Enable: "Send cookies with requests"
3. Test again
```

---

## 📋 File Verification

### Check all files created
```bash
# Linux/Mac
ls -la frontend-peminjaman/ | grep -E "(LOGIN|setup|BACKEND|.env.example)"

# Windows PowerShell
Get-ChildItem frontend-peminjaman/ | Where-Object Name -Match '(LOGIN|setup|BACKEND|.env)'
```

### Check App.jsx updated
```bash
grep -n "GoogleOAuthProvider" frontend-peminjaman/src/App.jsx
grep -n "Login" frontend-peminjaman/src/App.jsx
```

### Check Layout.jsx updated
```bash
grep -n "Outlet" frontend-peminjaman/src/components/layout/Layout.jsx
```

---

## 🚀 Build & Deploy

### Build for Production
```bash
cd frontend-peminjaman
npm run build

# Output in: dist/
```

### Preview Production Build
```bash
npm run preview

# Test at: http://localhost:4173/
```

### Lint Code
```bash
npm run lint
```

---

## 🎯 Common Tasks

### Update Backend URL
```jsx
// In src/components/pages/Login.jsx
// Line 20: Change this URL
const response = await axios.post(
  "http://localhost:8080/auth/google",  // <- Change here
  { token },
  { withCredentials: true }
);
```

### Add Logout Button
```jsx
// Add to any component:
const handleLogout = () => {
  navigate("/login");
  // Backend can handle session cleanup
};

<button onClick={handleLogout}>Logout</button>
```

### Check Network Requests
```
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Click Google Sign-In button
4. Look for POST /auth/google request
5. Check:
   - Request Headers
   - Request Body
   - Response Status
   - Response Body
   - Cookies
```

---

## 📊 Project Structure Verification

```bash
# Should exist:
frontend-peminjaman/
├── src/components/pages/Login.jsx          ✅
├── src/App.jsx                             ✅
├── src/components/layout/Layout.jsx        ✅
├── .env.example                            ✅
├── LOGIN_README.md                         ✅
├── LOGIN_SETUP.md                          ✅
├── BACKEND_INTEGRATION.md                  ✅
└── package.json                            ✅
```

---

## 🐛 Troubleshooting Commands

### npm install fails
```bash
npm cache clean --force
npm install
npm install @react-oauth/google
```

### Port 5173 already in use
```bash
# Find process using port 5173
# Linux/Mac:
lsof -i :5173

# Windows PowerShell:
Get-NetTCPConnection -LocalPort 5173

# Kill process
# Linux/Mac:
kill -9 <PID>

# Windows:
taskkill /PID <PID> /F
```

### .env not being read
```bash
# Make sure:
1. File exists in root: frontend-peminjaman/.env
2. Contains: VITE_GOOGLE_CLIENT_ID=...
3. Restart dev server: npm run dev
4. Check if ClientID is valid
```

### GoogleLogin button not showing
```bash
# Check:
1. @react-oauth/google installed: npm list @react-oauth/google
2. .env has VITE_GOOGLE_CLIENT_ID
3. App.jsx has GoogleOAuthProvider
4. Browser console for errors (F12)
5. Check if ClientID is correct
```

---

## 📱 Testing on Different Devices

### Mobile Testing (DevTools)
```
1. F12 or Right Click > Inspect
2. Click device icon (mobile)
3. Select device (iPhone, Android, etc.)
4. Refresh page
5. Test login on simulated mobile
```

### Test on Real Mobile
```
# Get your PC IP
ipconfig getifaddr en0   # Mac
hostname -I              # Linux
ipconfig                 # Windows

# On mobile browser, go to:
http://<YOUR_PC_IP>:5173/login
```

### Test on Different Browsers
```
- Chrome
- Firefox
- Safari
- Edge
```

---

## 📈 Performance Check

### Lighthouse Audit
```
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Click "Generate report"
4. Check Performance, Accessibility, etc.
```

### Bundle Size
```bash
npm run build
npm install -g serve
serve -s dist

# Or check in console:
# "final chunk size" after npm run build
```

---

## 🔐 Security Check

### Verify No Token in Storage
```javascript
// In Browser Console (F12):
localStorage
sessionStorage
// Should be empty or no tokens

// Should see cookies:
document.cookie
```

### Test withCredentials
```javascript
// Network tab > POST /auth/google
// Headers tab should show:
// Cookie: [session_id=...]
```

---

## 📚 Documentation Review

### Suggested Reading Order
1. **COMPLETION_SUMMARY.md** - Overview
2. **LOGIN_README.md** - Quick start
3. **LOGIN_SETUP.md** - Detailed setup
4. **LOGIN_CODE_EXPLANATION.md** - Code review
5. **BACKEND_INTEGRATION.md** - Backend spec
6. **LOGIN_CHECKLIST.md** - Testing

---

## ⚡ Time Estimates

| Task | Time |
|------|------|
| Install dependencies | 2-5 min |
| Setup Google OAuth | 10-15 min |
| Create .env file | 1 min |
| Start dev server | 2-3 min |
| Test login | 5-10 min |
| Implement backend | 30-60 min |
| Full integration testing | 30-45 min |

---

## ✅ Pre-Launch Checklist

- [ ] All files created successfully
- [ ] Dependencies installed
- [ ] Google Client ID obtained
- [ ] .env file created with Client ID
- [ ] Dev server runs without errors
- [ ] Login page accessible at /login
- [ ] Google Sign-In button visible
- [ ] Console shows user name after login
- [ ] Backend endpoint implemented
- [ ] Redirect working correctly
- [ ] Error handling tested
- [ ] Mobile responsiveness verified
- [ ] Production build succeeds
- [ ] All documentation reviewed

---

**Ready to launch? You're all set! 🎉**
