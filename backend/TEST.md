# Test Authentication Flow

## ✅ Backend Status
- Server: Running on http://localhost:3000
- Database: MongoDB Connected
- Endpoints: /api/auth/signup, /api/auth/signin, /api/auth/me

## ✅ Frontend Status
- Server: Running on http://localhost:8000
- Signup Page: http://localhost:8000/auth/signup.html
- Login Page: http://localhost:8000/auth/login.html

## Test Flow

### 1. Test Signup (đã test thành công)
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@wandertale.com","password":"password123"}'
```

**Result**: ✅ Success
- User created in database
- JWT token generated
- Response includes user info

### 2. Test Signin (đã test thành công)
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@wandertale.com","password":"password123"}'
```

**Result**: ✅ Success
- User authenticated
- JWT token generated
- lastLogin updated

## Frontend Integration

### Signup Form (`/auth/signup.html`)
- ✅ Form inputs: fullName, email, password
- ✅ Validation: Terms checkbox, password requirements
- ✅ API integration: Calls AuthAPI.signup()
- ✅ Error handling: Displays error messages
- ✅ Loading state: Shows spinner during request
- ✅ Success redirect: → /app/explore/map.html

### Login Form (`/auth/login.html`)
- ✅ Form inputs: email, password
- ✅ API integration: Calls AuthAPI.signin()
- ✅ Error handling: Displays error messages
- ✅ Loading state: Shows spinner during request
- ✅ Success redirect: → /app/explore/map.html

### AuthAPI (`/assets/js/auth-api.js`)
- ✅ signup(): POST to /api/auth/signup
- ✅ signin(): POST to /api/auth/signin
- ✅ getCurrentUser(): GET /api/auth/me
- ✅ Token storage: localStorage
- ✅ Auto logout on invalid token

### AuthGuard (`/assets/js/auth.js`)
- ✅ isAuthenticated(): Check if user logged in
- ✅ requireAuth(): Protect routes
- ✅ logout(): Clear session
- ✅ getUser(): Get current user data

## How to Test Manually

1. **Open Signup Page**:
   - Go to: http://localhost:8000/auth/signup.html
   - Fill in: Full Name, Email, Password
   - Check Terms checkbox
   - Click "Create Account"
   - Should redirect to /app/explore/map.html

2. **Test Login**:
   - Go to: http://localhost:8000/auth/login.html
   - Enter email and password from signup
   - Click "Sign In to Journey"
   - Should redirect to /app/explore/map.html

3. **Check LocalStorage**:
   - Open DevTools → Application → Local Storage
   - Should see: `token` and `user` keys

4. **Test Protected Routes**:
   - Try accessing /app/explore/map.html without login
   - Should redirect to /auth/login.html

## API Response Examples

### Successful Signup:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "69b415cb58bb425ea5c543de",
    "fullName": "Test User",
    "email": "test@wandertale.com",
    "createdAt": "2026-03-13T13:48:59.319Z"
  }
}
```

### Successful Signin:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "69b415cb58bb425ea5c543de",
    "fullName": "Test User",
    "email": "test@wandertale.com",
    "avatar": null,
    "lastLogin": "2026-03-13T13:49:04.462Z"
  }
}
```

### Error Response:
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

## Security Features Implemented

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT tokens with 7 days expiration
- ✅ Input validation (email format, password strength)
- ✅ Unique email constraint
- ✅ Secure password storage (never returned in API)
- ✅ CORS enabled for localhost:8000
- ✅ Error messages don't leak sensitive info

## Next Steps (Optional)

1. Add email verification
2. Add password reset flow
3. Add OAuth (Facebook, Google)
4. Add refresh token mechanism
5. Add rate limiting
6. Add user profile update endpoints
7. Add logout endpoint (blacklist tokens)
