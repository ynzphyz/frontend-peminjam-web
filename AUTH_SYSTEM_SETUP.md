# 🔐 Login System dengan Google Sign-In - UPDATED

## ✅ Fitur yang Sudah Diimplementasikan

### Authentication System
- ✅ Google Sign-In dengan @react-oauth/google
- ✅ Auth Context untuk state management
- ✅ SessionStorage untuk user persistence
- ✅ Protected routes dengan role-based access

### UI Components
- ✅ Login page dengan Google button
- ✅ Navbar dengan Login/Register/Logout buttons
- ✅ Admin Dashboard (hanya untuk admin)
- ✅ Responsive design dengan tema navy blue

### Routing
- ✅ `/login` - Public login page
- ✅ `/admin` - Admin dashboard (protected)
- ✅ `/dashboard` - User dashboard redirect to home
- ✅ `/` - Home (protected)
- ✅ Semua routes lainnya protected

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend-peminjaman
npm install @react-oauth/google
```

### 2. Setup Google OAuth
1. Buka: https://console.cloud.google.com/
2. Create OAuth 2.0 Credentials
3. Copy Client ID

### 3. Create .env
```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
```

### 4. Run Development
```bash
npm run dev
```

### 5. Access Application
- Login page: http://localhost:5173/login
- After login: http://localhost:5173/ (protected)

---

## 📋 User Flow

```
1. User klik navbar "Login"
   ↓
2. Redirect ke /login
   ↓
3. Klik "Sign in with Google"
   ↓
4. Google auth popup
   ↓
5. Send token ke backend: POST /auth/google
   ↓
6. Backend return: { role, name }
   ↓
7. Save ke SessionStorage & Auth Context
   ↓
8. Role === "admin" ? → Redirect /admin
   Role === "user"  ? → Redirect /dashboard (home)
```

---

## 🏗️ Architecture

### AuthContext
- `user` - Current user object { role, name }
- `loading` - Loading state
- `login()` - Set user
- `logout()` - Clear user
- `isAuthenticated` - Boolean
- `isAdmin` - Boolean

### ProtectedRoute
- Redirect unauthenticated users to /login
- Redirect users without required role to /
- Show loading spinner while checking

### Components Updated
- **Navbar** - Add login/logout/register buttons
- **Login** - Use Auth context
- **App.jsx** - AuthProvider wrapper
- **AdminDashboard** - New component

---

## 📂 New Files Created

```
src/
├── contexts/
│   └── AuthContext.jsx (NEW)
├── components/
│   ├── ProtectedRoute.jsx (NEW)
│   ├── pages/
│   │   ├── Login.jsx (UPDATED)
│   │   └── AdminDashboard.jsx (NEW)
│   └── layout/
│       └── Navbar.jsx (UPDATED)
└── App.jsx (UPDATED)
```

---

## 🔧 Backend Integration

### Required Endpoint

```
POST http://localhost:8080/auth/google

Request Body:
{
  "token": "google_jwt_credential"
}

Response (Success):
{
  "role": "admin" or "user",
  "name": "User Full Name"
}

Response (Error):
{
  "message": "Error description"
}
Status: 400, 401, 500
```

---

## 🎯 Test Checklist

- [ ] Install @react-oauth/google
- [ ] Create .env with Google Client ID
- [ ] npm run dev starts successfully
- [ ] Can see Login button in navbar (when not logged in)
- [ ] Click login → redirects to /login
- [ ] See Google Sign-In button
- [ ] Click Google button → shows Google popup
- [ ] After login → name shows in navbar
- [ ] Admin users → see /admin dashboard
- [ ] Regular users → redirected to /dashboard (home)
- [ ] Logout button works
- [ ] Refresh page → user still logged in
- [ ] Manually visit /admin → redirected if not admin
- [ ] Protected routes work

---

## 🛠️ Customization

### Change Backend URL
**File:** `src/components/pages/Login.jsx` (line ~28)
```jsx
const response = await axios.post(
  "http://localhost:8080/auth/google", // ← Change here
  { token },
  { withCredentials: true }
);
```

### Add More User Info
**File:** `src/contexts/AuthContext.jsx`
```jsx
// User object can have more fields
const login = (userData) => {
  setUser({
    role: userData.role,
    name: userData.name,
    email: userData.email,  // Add more fields
    avatar: userData.avatar
  });
  sessionStorage.setItem("user", JSON.stringify(userData));
};
```

### Customize Admin Dashboard
**File:** `src/components/pages/AdminDashboard.jsx`
- Modify stats cards
- Add more management tools
- Change layout

---

## 📱 Features

### Navbar Authentication
- **Not Logged In:** Show "Login" and "Register" buttons
- **Logged In:** Show user info and "Logout" button
- **Mobile:** Same features in dropdown menu
- **Responsive:** Works on all screen sizes

### Admin Dashboard
- Exclusive for admin users
- Shows admin stats
- Management tools placeholders
- Styled with theme

### Session Persistence
- User info saved in sessionStorage
- Persists on page refresh
- Cleared on logout
- Different from localStorage (more secure)

---

## ⚠️ Important Notes

1. **Register Page**
   - Currently navigates to /register (doesn't exist)
   - Backend needs to handle registration
   - Can use same Google auth or add traditional signup

2. **SessionStorage**
   - User data stored in sessionStorage (session-based)
   - Not as secure as httpOnly cookies
   - Can be improved by backend storing session

3. **Protected Routes**
   - All routes except /login are protected
   - Must be authenticated to access
   - Admin routes require admin role

4. **CORS & Credentials**
   - withCredentials: true for cookie handling
   - Backend must set proper CORS headers
   - Credentials cookie will be sent automatically

---

## 🐛 Troubleshooting

**Issue:** "GoogleLogin button not showing"
- Check if VITE_GOOGLE_CLIENT_ID is in .env
- Verify Client ID is correct
- Check browser console for errors

**Issue:** "Logout not working"
- Check if LogOut icon is imported from lucide-react
- Verify logout button has handleLogout onClick

**Issue:** "Can't access /admin"
- Check if user role is "admin"
- Verify backend returns correct role
- Check ProtectedRoute component

**Issue:** "User not persisting on refresh"
- Check sessionStorage in browser DevTools
- Verify AuthContext useEffect on mount
- Check if user data is valid JSON

---

## 📚 References

- [Google OAuth Documentation](https://developers.google.com/identity/gsi/web)
- [React OAuth GitHub](https://github.com/react-oauth/react-oauth-google)
- [React Context API](https://react.dev/reference/react/useContext)

---

**Status: ✅ READY TO USE**

Next: Implement backend endpoint `/auth/google`
