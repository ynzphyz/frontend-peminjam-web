# 🔐 Login Page React + Google Sign-In

Halaman login modern dengan Google OAuth integration untuk SMKN 7 Semarang Peminjaman System.

## 📸 Fitur

✅ **Google Sign-In** - One-click authentication dengan Google  
✅ **Responsive Design** - Mobile dan desktop friendly  
✅ **Modern UI** - Navy blue gradient theme dengan animasi smooth  
✅ **Loading State** - Loading indicator dengan bounce animation  
✅ **Error Handling** - Error messages yang user-friendly  
✅ **Role-based Redirect** - Automatic redirect ke admin/user dashboard  
✅ **Secure** - No localStorage/sessionStorage, cookie-based sessions  
✅ **Single File** - All logic dalam satu file `Login.jsx`

## 🚀 Quick Start

### 1️⃣ Install Dependencies

```bash
cd frontend-peminjaman
npm install @react-oauth/google
```

### 2️⃣ Setup Environment Variables

Create `.env` file:
```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_FROM_GOOGLE_CLOUD
```

Get Client ID:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 Credentials
3. Type: Web Application
4. Copy Client ID

### 3️⃣ Implement Backend

Endpoint: `POST http://localhost:8080/auth/google`

Request:
```json
{
  "token": "google_jwt_token"
}
```

Response:
```json
{
  "role": "admin",
  "name": "John Doe"
}
```

See `BACKEND_INTEGRATION.md` for details.

### 4️⃣ Run

```bash
npm run dev
```

Visit: `http://localhost:5173/login`

## 📁 File Structure

```
frontend-peminjaman/
├── .env                          (create manually)
├── .env.example                  (template)
├── LOGIN_SETUP.md                (detailed setup guide)
├── BACKEND_INTEGRATION.md        (backend spec)
├── LOGIN_CHECKLIST.md            (features checklist)
├── setup-login.sh                (linux/mac setup)
├── setup-login.ps1               (windows setup)
└── src/
    ├── App.jsx                   (updated with routes)
    ├── components/
    │   ├── pages/
    │   │   └── Login.jsx         (new login page)
    │   └── layout/
    │       └── Layout.jsx        (updated)
    └── ...
```

## 🎯 Component Overview

### Login.jsx (180 lines)

```jsx
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
```

**Key Features:**
- Google Sign-In button (dark theme)
- Async token submission to backend
- Role-based navigation
- Error state management
- Loading animations
- Console logging of user name

**Flow:**
```
User clicks Sign-In
    ↓
Google credential received
    ↓
Token sent to POST /auth/google
    ↓
Backend validates & returns role
    ↓
Redirect to /admin or /dashboard
```

## 🔌 Integration Points

### Frontend → Backend
- **URL:** `http://localhost:8080/auth/google`
- **Method:** POST
- **Body:** `{ token: credential }`
- **Cookies:** `withCredentials: true` (enabled)

### Backend → Google
- Validate JWT signature
- Extract email & name
- Check/create user in database

### Backend → Frontend
- Set httpOnly cookie
- Return `{ role, name }`

## 🎨 Styling

- **Theme:** Navy blue gradient (`#0a183d` to `#1a2a4a`)
- **Animations:** Framer Motion smooth transitions
- **Responsive:** Mobile-first design
- **Colors:**
  - Primary: Blue gradient
  - Secondary: Cyan accent
  - Background: Dark navy
  - Text: Light gray/blue

## ⚙️ Environment Variables

```env
# Google OAuth Client ID
VITE_GOOGLE_CLIENT_ID=abc123def456...

# Backend URL (hardcoded in Login.jsx, but can be updated)
# POST http://localhost:8080/auth/google
```

## 🔐 Security Features

✅ No token storage in localStorage/sessionStorage  
✅ Cookie-based sessions with `withCredentials: true`  
✅ JWT validation on backend  
✅ CORS properly configured  
✅ httpOnly cookies for session  

## 📋 Checklist untuk Setup

- [ ] Install `@react-oauth/google`
- [ ] Create `.env` dengan Google Client ID
- [ ] Update App.jsx (already done ✓)
- [ ] Update Layout.jsx (already done ✓)
- [ ] Create Login.jsx (already done ✓)
- [ ] Implement backend endpoint
- [ ] Test Google Sign-In
- [ ] Verify token sent correctly
- [ ] Test role-based redirect
- [ ] Verify user name in console

## 🧪 Testing

```bash
# 1. Start frontend
npm run dev

# 2. Open http://localhost:5173/login

# 3. Click "Sign in with Google"

# 4. Check console for "User logged in: [name]"

# 5. Verify redirect to /admin or /dashboard

# 6. Check network tab for POST /auth/google request
```

## 🛠️ Troubleshooting

### Error: "VITE_GOOGLE_CLIENT_ID is empty"
- Make sure `.env` file exists in project root
- Add: `VITE_GOOGLE_CLIENT_ID=your_actual_client_id`

### Error: "GoogleOAuthProvider not found"
- Run: `npm install @react-oauth/google`

### Button not appearing
- Check if CLIENT_ID is set in .env
- Check console for errors
- Verify `@react-oauth/google` is installed

### Redirect not working
- Check if backend returns `role` and `name`
- Verify backend response format
- Check browser console for errors

### Cookie not being sent
- Make sure `withCredentials: true` is set (already done)
- Check CORS configuration in backend
- Verify domain/origin match

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/gsi/web)
- [React OAuth Library](https://github.com/react-oauth/react-oauth-google)
- [JWT Tokens Explained](https://jwt.io/)

## 📝 Notes

- All code is in ONE file: `Login.jsx`
- No additional components created
- No token stored locally (secure)
- Backend is responsible for session management
- Compatible with React Router v7+
- Requires Node.js 16+

## 💡 Next Steps

1. ✅ Frontend setup complete
2. ⏳ Backend implementation (POST /auth/google)
3. ⏳ Admin dashboard (route: /admin)
4. ⏳ User dashboard (route: /dashboard)
5. ⏳ Logout functionality
6. ⏳ Protected routes with auth middleware

---

**Created for:** SMKN 7 Semarang - Sistem Manajemen Peminjaman  
**Date:** December 2024  
**Status:** ✅ Complete and Ready to Use
