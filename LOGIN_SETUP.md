# Login dengan Google Sign-In

Halaman login sudah dibuat dengan fitur Google Sign-In. Berikut adalah panduan setup dan integrasi.

## Instalasi Dependencies

Tambahkan package yang diperlukan:

```bash
npm install @react-oauth/google
```

Package yang dibutuhkan sudah ada:
- `axios` - untuk HTTP requests
- `react-router-dom` - untuk routing
- `framer-motion` - untuk animasi

## Konfigurasi Environment

### 1. Setup Google OAuth di Google Cloud Console

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau gunakan project yang sudah ada
3. Enable "Google+ API"
4. Buat OAuth 2.0 Credentials:
   - Tipe: OAuth 2.0 Client ID
   - Application Type: Web Application
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URIs: `http://localhost:5173`
5. Salin Client ID

### 2. Setup Environment Variable

1. Buat file `.env` di root folder `frontend-peminjaman`:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
```

2. Ganti `YOUR_GOOGLE_CLIENT_ID_HERE` dengan Client ID dari Google Cloud Console

## Struktur Login Page

File: `src/components/pages/Login.jsx`

### Fitur:
- ✅ Google Sign-In button (dark theme)
- ✅ Loading state dengan animasi
- ✅ Error handling
- ✅ Token dikirim ke backend: `POST http://localhost:8080/auth/google`
- ✅ Body: `{ token: res.credential }`
- ✅ Dengan `withCredentials: true`
- ✅ Redirect berdasarkan role:
  - `admin` → `/admin`
  - `user` → `/dashboard`
- ✅ User name ditampilkan di console.log
- ✅ UI responsif dengan tema navy blue gradient

### Styling:
- Navy blue gradient background
- Animasi smooth dengan Framer Motion
- Decorative elements dengan animated blobs
- Loading indicator dengan bounce animation
- Error message dengan styling yang jelas

## Routing Integration

App.jsx sudah diupdate dengan:
- Route login di path `/login`
- GoogleOAuthProvider wrapper
- Layout hanya ditampilkan untuk authenticated routes

## Backend Integration

Backend endpoint yang dibutuhkan:

```
POST http://localhost:8080/auth/google
Content-Type: application/json
Cookie: akan dikirim otomatis (withCredentials: true)

Request Body:
{
  "token": "jwt_token_dari_google"
}

Expected Response:
{
  "role": "admin" | "user",
  "name": "User Name"
}
```

## Cara Mengakses Login Page

Akses di: `http://localhost:5173/login`

Atau tambahkan link di navbar untuk redirect ke login page ketika belum authenticated.

## Testing

1. Jalankan frontend:
```bash
npm run dev
```

2. Akses `http://localhost:5173/login`

3. Klik tombol "Sign in with Google"

4. Setelah login sukses:
   - Cek console untuk melihat nama user
   - Akan redirect ke `/admin` atau `/dashboard` sesuai role

## Notes

- Token dari Google **tidak disimpan** di localStorage atau sessionStorage
- Hanya `withCredentials: true` yang digunakan untuk cookie handling
- Backend bertanggung jawab untuk menyimpan session/token
- UI sesuai dengan tema web (navy blue gradient, animasi, responsive)
- Semua kode ada dalam satu file `Login.jsx` (tidak ada komponen tambahan)
