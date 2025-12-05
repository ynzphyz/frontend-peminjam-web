# Backend Integration Guide - Google Login

## Endpoint yang Dibutuhkan

### POST /auth/google

**URL:** `http://localhost:8080/auth/google`

**Request:**
```json
{
  "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ..."
}
```

**Response (Success 200):**
```json
{
  "role": "admin",
  "name": "John Doe"
}
```

atau

```json
{
  "role": "user",
  "name": "Jane Smith"
}
```

**Response (Error):**
```json
{
  "message": "Invalid token"
}
```

Status Code: 400, 401, atau 500

## Implementasi

### Langkah-langkah:

1. **Validasi JWT Token** - Verifikasi token dari Google menggunakan Google Public Keys
2. **Extract User Info** - Ambil email dan nama dari decoded JWT
3. **Cek Database** - Lihat apakah user sudah ada di database
4. **Set Session/Cookie** - Simpan session atau set httpOnly cookie
5. **Return Role** - Return role (admin/user) dan nama user

### Backend Handling:

```pseudo
POST /auth/google:
  1. Ambil token dari request body
  2. Decode & validate JWT dengan Google Public Keys
  3. Extract: email, name dari token
  4. Query database untuk user dengan email tersebut
  5. Jika belum ada, create user baru
  6. Set session/cookie httpOnly
  7. Return { role, name }
```

## Cookies

- Frontend mengirim `withCredentials: true`
- Backend dapat set `Set-Cookie` header dengan httpOnly flag
- Cookie akan otomatis dikirim di setiap request berikutnya

## Error Handling

Validasi dan return error jika:
- Token invalid/expired
- User tidak ditemukan (optional: buat user baru)
- Database error

## Testing dengan cURL

```bash
curl -X POST http://localhost:8080/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token":"eyJhbGc..."}'
```

## Security Notes

- ✅ Validasi JWT signature dengan Google Public Keys
- ✅ Cek token expiry
- ✅ Gunakan httpOnly cookies
- ✅ CORS: Allow origin `http://localhost:5173` (dev)
- ✅ Validasi token sekali saja di backend, jangan forward ke service lain

## Flow Diagram

```
Frontend                    Backend                Google
   |                           |                      |
   |-- POST /auth/google ------>|                      |
   |   { token }                |                      |
   |                            |---- Verify JWT ----->|
   |                            |<---- JWT Valid -------|
   |                            |                      |
   |                      [Decode token]
   |                      [Query database]
   |                      [Set cookie/session]
   |                            |
   |<-- 200 OK ---------|
   |  { role, name }    |
   |                    |
   |-- Other requests --->|
   |    (Cookie sent)    |
```

## Go Implementation Example

```go
type GoogleTokenRequest struct {
    Token string `json:"token"`
}

type GoogleAuthResponse struct {
    Role string `json:"role"`
    Name string `json:"name"`
}

func HandleGoogleAuth(c *gin.Context) {
    var req GoogleTokenRequest
    if err := c.BindJSON(&req); err != nil {
        c.JSON(400, gin.H{"message": "Invalid request"})
        return
    }

    // Verify token with Google
    claims, err := VerifyGoogleToken(req.Token)
    if err != nil {
        c.JSON(401, gin.H{"message": "Invalid token"})
        return
    }

    // Get or create user
    user, err := GetOrCreateUser(claims.Email, claims.Name)
    if err != nil {
        c.JSON(500, gin.H{"message": "Database error"})
        return
    }

    // Set session/cookie
    c.SetCookie("session", sessionID, 3600, "/", "localhost", false, true)

    c.JSON(200, GoogleAuthResponse{
        Role: user.Role,
        Name: user.Name,
    })
}
```
