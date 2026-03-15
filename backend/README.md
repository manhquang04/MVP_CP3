# WanderTale Backend API

Backend API cho ứng dụng WanderTale - Travel planning and storytelling platform.

## Cài đặt

```bash
cd backend
npm install
```

## Cấu hình

File `.env` đã được cấu hình với:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key cho JWT tokens
- `PORT`: Server port (default: 5000)

## Chạy server

```bash
# Development mode (với nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

#### 1. Sign Up (Đăng ký)
```
POST /api/auth/signup
Content-Type: application/json

Body:
{
  "fullName": "Nguyen Van A",
  "email": "user@example.com",
  "password": "password123"
}

Response (Success):
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "fullName": "Nguyen Van A",
    "email": "user@example.com",
    "createdAt": "2026-03-13T..."
  }
}
```

#### 2. Sign In (Đăng nhập)
```
POST /api/auth/signin
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response (Success):
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "fullName": "Nguyen Van A",
    "email": "user@example.com",
    "avatar": null,
    "lastLogin": "2026-03-13T..."
  }
}
```

#### 3. Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}

Response (Success):
{
  "success": true,
  "user": {
    "id": "user_id",
    "fullName": "Nguyen Van A",
    "email": "user@example.com",
    "avatar": null,
    "createdAt": "2026-03-13T...",
    "lastLogin": "2026-03-13T..."
  }
}
```

## Validation Rules

### Sign Up:
- `fullName`: Bắt buộc, tối thiểu 2 ký tự
- `email`: Bắt buộc, định dạng email hợp lệ, unique
- `password`: Bắt buộc, tối thiểu 8 ký tự, phải có cả chữ và số

### Sign In:
- `email`: Bắt buộc, định dạng email hợp lệ
- `password`: Bắt buộc

## Security Features

- ✅ Password hashing với bcrypt (10 salt rounds)
- ✅ JWT authentication với 7 days expiration
- ✅ Input validation với express-validator
- ✅ CORS enabled
- ✅ Error handling
- ✅ Secure password storage (never returned in responses)

## Database Schema

### User Model:
```javascript
{
  fullName: String (required, min: 2)
  email: String (required, unique, email format)
  password: String (required, hashed, min: 8)
  avatar: String (optional)
  createdAt: Date (auto)
  lastLogin: Date (auto-updated)
  timestamps: true
}
```

## Testing với cURL

### Sign Up:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Sign In:
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Current User:
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Error Responses

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "msg": "Validation error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

## Next Steps

1. Tích hợp với frontend forms (signup.html, login.html)
2. Thêm email verification
3. Thêm password reset functionality
4. Thêm OAuth (Google, Facebook)
5. Thêm user profile endpoints
6. Thêm rate limiting
7. Thêm refresh tokens
