# 🚀 SETUP & RUN INSTRUCTIONS

## Prerequisites
- Node.js 16+ installed
- Google Client ID (dari Google Cloud Console)

## Step 1: Navigate to Frontend Folder
```powershell
cd frontend-peminjaman
```

## Step 2: Install Dependencies
```powershell
npm install
npm install @react-oauth/google
```

## Step 3: Create .env File
```powershell
# Create file named .env in frontend-peminjaman folder
# Add this line:
VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID_HERE
```

## Step 4: Verify Installation
```powershell
# Check if packages are installed
npm list @react-oauth/google
npm list axios
npm list react-router-dom
```

## Step 5: Start Development Server
```powershell
npm run dev
```

You should see output like:
```
  VITE v6.3.5  ready in 256 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

## Step 6: Open Browser
```
http://localhost:5173/login
```

---

## Expected UI Elements

### Login Page (/login)
- ✅ SMKN 7 Semarang logo
- ✅ "Sign in with Google" button (dark theme)
- ✅ Smooth animations
- ✅ Navy blue gradient background

### After Google Login
- ✅ Redirect to /admin (if admin role) or / (if user role)
- ✅ Navbar shows user name and logout button
- ✅ Protected pages accessible
- ✅ User data persists on refresh

### Admin Dashboard (/admin)
- ✅ Welcome message with admin name
- ✅ 4 stat cards (peminjaman, users, pending, status)
- ✅ Management tools section
- ✅ Info box about admin access

---

## 🐛 Troubleshooting

### Error: "Missing script: dev"
```
Solution: Make sure you're in the frontend-peminjaman folder
cd frontend-peminjaman
npm run dev
```

### Error: "VITE_GOOGLE_CLIENT_ID is empty"
```
Solution: 
1. Create .env file in frontend-peminjaman folder
2. Add: VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
3. Restart dev server: npm run dev
```

### Error: "Cannot find module @react-oauth/google"
```
Solution:
npm install @react-oauth/google
# If still fails:
npm cache clean --force
npm install
npm install @react-oauth/google
```

### Google Button Not Showing
```
Solution:
1. Check if .env has VITE_GOOGLE_CLIENT_ID
2. Client ID is valid (from Google Cloud Console)
3. Check browser console (F12) for errors
4. Restart dev server
```

### Port 5173 Already in Use
```
Solution: Kill process or change port
# PowerShell:
Get-NetTCPConnection -LocalPort 5173
taskkill /PID <PID> /F

# Or let Vite use different port:
npm run dev -- --port 5174
```

---

## 🧪 Testing

### Test 1: Navigate to Login
```
1. Go to http://localhost:5173/login
2. Should see login page with Google button
```

### Test 2: Test Not Authenticated
```
1. Go to http://localhost:5173/
2. Should redirect to /login
```

### Test 3: Mock Login (for development)
```
If backend not ready, you can test UI by:
1. Open browser DevTools (F12)
2. Console tab
3. Manually set user:
   sessionStorage.setItem('user', JSON.stringify({role: 'admin', name: 'Test Admin'}))
4. Refresh page
5. Should see navbar with user name
```

### Test 4: Check Admin Dashboard
```
1. Login as admin user
2. Should redirect to /admin
3. Should see admin dashboard
```

### Test 5: Check Protected Routes
```
1. Login as regular user
2. Should redirect to /
3. Should see main layout
4. Protected pages accessible
```

---

## 📋 File Checklist

Verify these files exist:

```
frontend-peminjaman/
├── src/
│   ├── contexts/
│   │   └── AuthContext.jsx ✅
│   ├── components/
│   │   ├── ProtectedRoute.jsx ✅
│   │   ├── pages/
│   │   │   ├── Login.jsx (updated) ✅
│   │   │   └── AdminDashboard.jsx ✅
│   │   └── layout/
│   │       └── Navbar.jsx (updated) ✅
│   ├── App.jsx (updated) ✅
│   └── main.jsx
├── .env (CREATE THIS) ✅
├── .env.example
├── package.json
└── vite.config.js
```

---

## 🎯 Next Steps

1. ✅ Frontend setup complete
2. ⏳ Backend: Implement POST /auth/google endpoint
3. ⏳ Backend: Return { role, name } JSON
4. ⏳ Test full login flow
5. ⏳ Add more admin features
6. ⏳ Deploy to production

---

## 💡 Pro Tips

1. **Keep Dev Server Running**
   - In one terminal: `npm run dev`
   - Dev server auto-reloads on file changes

2. **Use Browser DevTools**
   - F12 to open
   - Network tab to see API calls
   - Console for logs
   - Application tab to check sessionStorage

3. **Test with Different User Roles**
   - Create test Google accounts
   - One for admin, one for regular user
   - Test both redirect paths

4. **Check Network Requests**
   - Go to /login
   - Click Google button
   - Check Network tab for POST /auth/google
   - See request/response in DevTools

5. **Save Your Client ID**
   - Keep Google Client ID safe
   - Don't commit .env to git
   - Use environment variables for production

---

**Ready? Run `npm run dev` in frontend-peminjaman folder! 🚀**
