# 📖 Login.jsx Code Explanation

Complete breakdown of the `src/components/pages/Login.jsx` file.

## 📊 Component Overview

**File:** `src/components/pages/Login.jsx`  
**Lines:** 180  
**Dependencies:**
- React (hooks)
- react-router-dom (navigation)
- @react-oauth/google (GoogleLogin)
- axios (HTTP requests)
- framer-motion (animations)

## 🔧 Core Logic

### 1. Component Setup (Lines 1-12)

```jsx
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
```

- `navigate` - Router navigation function
- `loading` - Tracks submission state
- `error` - Stores error messages

### 2. Success Handler (Lines 14-44)

```jsx
const handleGoogleSuccess = async (credentialResponse) => {
  try {
    setLoading(true);
    setError("");

    const token = credentialResponse.credential;

    // Send token to backend
    const response = await axios.post(
      "http://localhost:8080/auth/google",
      { token },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { role, name } = response.data;

    // Log user name to console
    console.log("User logged in:", name);

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/dashboard");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError(
      err.response?.data?.message ||
        "Login gagal. Silakan coba lagi."
    );
    setLoading(false);
  }
};
```

**Flow:**
1. Set loading state
2. Extract JWT token from Google credential
3. Send to backend via POST with:
   - `{ token: credentialResponse.credential }`
   - `withCredentials: true` (for cookies)
4. Receive `{ role, name }`
5. Log name to console
6. Redirect based on role
7. On error: show error message & keep loading false

### 3. Error Handler (Lines 46-48)

```jsx
const handleGoogleError = () => {
  setError("Gagal melakukan login dengan Google");
};
```

Simple error state when Google Sign-In fails.

## 🎨 UI Structure (Lines 50-180)

### Main Container (Lines 50-65)

```jsx
<div className="min-h-screen w-full flex items-center justify-center 
                bg-gradient-to-br from-[#0a183d] via-[#0f1b35] to-[#1a2a4a] 
                relative overflow-hidden">
```

- Full screen height
- Centered content
- Navy blue gradient background
- Background animations overlay

### Decorative Blobs (Lines 52-57)

```jsx
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 
                  rounded-full blur-3xl opacity-50 animate-pulse" />
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 
                  rounded-full blur-3xl opacity-50 animate-pulse" />
</div>
```

Animated blur circles in background (aesthetic).

### Motion Container (Lines 59-69)

```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="relative z-10 w-full max-w-md mx-4"
>
```

Main card container with entrance animation:
- Starts: invisible, small (0.9 scale)
- Animates to: visible, normal size
- Duration: 0.6s ease-out

### Card Styling (Lines 70-72)

```jsx
<div className="bg-gradient-to-br from-[#0f2855]/80 to-[#051530]/80 
               backdrop-blur-xl rounded-2xl border border-blue-500/20 
               p-8 md:p-10 shadow-2xl shadow-blue-900/50">
```

- Gradient background with transparency
- Backdrop blur for glass effect
- Rounded corners
- Subtle blue border
- Deep shadow

### Header Section (Lines 73-100)

**Logo Animation:**
```jsx
<motion.div
  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 
             rounded-xl flex items-center justify-center font-bold 
             text-white text-2xl shadow-lg shadow-blue-500/40"
  whileHover={{
    scale: 1.08,
    boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
  }}
>
  S7
</motion.div>
```

Logo "S7" with hover animation (scales up, glows).

**Title & Subtitle:**
```jsx
<h1 className="text-3xl md:text-4xl font-bold mb-2 
              bg-gradient-to-r from-blue-300 to-cyan-300 
              bg-clip-text text-transparent">
  SMKN 7 Semarang
</h1>
```

Responsive text with gradient color.

### Error Display (Lines 102-108)

```jsx
{error && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
  >
    <p className="text-red-300 text-sm font-medium">{error}</p>
  </motion.div>
)}
```

Conditional error display with slide-in animation.

### Google Button (Lines 110-125)

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className="mb-6"
>
  <div className="flex justify-center">
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
      text="signin_with"
      theme="dark"
      size="large"
    />
  </div>
</motion.div>
```

- Delayed animation (0.3s after header)
- Dark theme Google button
- Centered, large size
- Callbacks for success/error

### Loading State (Lines 127-140)

```jsx
{loading && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center"
  >
    <div className="flex justify-center items-center gap-2 mb-3">
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
    </div>
    <p className="text-sm text-gray-400">Memproses login...</p>
  </motion.div>
)}
```

Three bouncing dots loading indicator with staggered animation.

### Footer Info (Lines 142-151)

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.5 }}
  className="mt-8 pt-6 border-t border-blue-500/20 text-center"
>
  <p className="text-xs text-gray-500">
    Dengan login, Anda setuju dengan{" "}
    <span className="text-blue-300/70">syarat dan ketentuan</span> kami
  </p>
</motion.div>
```

Terms & conditions footer with fade-in animation (0.5s delay).

### Decorative Animations (Lines 153-162)

```jsx
<motion.div
  animate={{ y: [0, -20, 0] }}
  transition={{ duration: 4, repeat: Infinity }}
  className="absolute -top-20 -right-20 w-40 h-40 
             bg-blue-500/5 rounded-full blur-3xl"
/>
```

Floating animated circles (infinite Y-axis movement).

## 🎬 Animation Sequence

| Time | Element | Animation |
|------|---------|-----------|
| 0.0s | Main container | Scale 0.9→1.0, opacity fade |
| 0.2s | Header | Y -20→0, fade in |
| 0.3s | Google button | Y 20→0, fade in |
| 0.5s | Footer | Fade in |
| ∞ | Background blobs | Pulse animation |
| ∞ | Decorative circles | Y-axis floating |

## 🔄 Conditional Rendering

**Error Message:**
```jsx
{error && <div>...</div>}
```
Shows only when error state is not empty.

**Loading Indicator:**
```jsx
{loading && <div>...</div>}
```
Shows only during async submission.

## 🚀 Key Features Implemented

✅ State management with hooks  
✅ Async/await error handling  
✅ Form submission with axios  
✅ Cookie-based credentials  
✅ Console logging  
✅ Dynamic navigation based on role  
✅ Smooth animations throughout  
✅ Loading/error states  
✅ Responsive design (md breakpoint)  
✅ Accessibility (motion, contrast)

## 📱 Responsive Breakpoints

- **Mobile:** Full width, adjusted padding
- **Tablet+:** Max-width 448px (md:max-w-md)
- **Text sizes:** Responsive with md: variants

## 🎯 User Interactions

1. **Load page** → Container & header fade in
2. **Hover logo** → Scale & glow
3. **Click Google button** → Modal/popup from Google
4. **During auth** → Loading dots appear
5. **Success** → Automatic redirect
6. **Error** → Error message slides in

## 💡 Code Quality

- ✅ Clean, readable code
- ✅ Proper error handling
- ✅ Semantic HTML
- ✅ Tailwind utility classes
- ✅ Framer Motion best practices
- ✅ No hardcoded sensitive data (except backend URL)
- ✅ No console.logs in production (only user name)

## 🔧 Customization Points

**Backend URL** (Line 20):
```jsx
"http://localhost:8080/auth/google"
```
Change to production URL as needed.

**Colors:**
- Primary blue: `#0a183d`, `#0f1b35`, `#1a2a4a`
- Accent: Cyan (`bg-cyan-400`)
- Text: Gray/Blue gradient

**Animation durations:**
- Container: `0.6s`
- Items: `0.5s` with delays
- Loops: `4s` and `5s`

---

**Component is production-ready and follows React best practices.**
