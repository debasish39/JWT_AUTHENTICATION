# 🔐 JWT Authentication API – Postman Collection

This API provides a complete JWT-based authentication system built with Django.  
Use this with the included Postman collection to test user registration, login, profile access, password reset, and more.

---

## 📦 Collection: `JWT Auth Test`

### ✅ Included Endpoints:

| #   | Endpoint Name                    | Method | URL                                                                | Auth Required |
|-----|----------------------------------|--------|---------------------------------------------------------------------|---------------|
| 1   | User Register                    | POST   | `http://127.0.0.1:8000/api/register/`                               | ❌ No          |
| 2   | User Login                       | POST   | `http://127.0.0.1:8000/api/login/`                                  | ❌ No          |
| 3   | User Profile                     | GET    | `http://127.0.0.1:8000/api/profile/`                                | ✅ Bearer Token |
| 4   | Change Password                  | POST   | `http://127.0.0.1:8000/api/changepassword/`                         | ✅ Bearer Token |
| 5   | Send Reset Password Email       | POST   | `http://127.0.0.1:8000/api/send-reset-password-email/`             | ❌ No          |
| 6   | Reset Password (via UID/Token)  | POST   | `http://127.0.0.1:8000/api/reset-password/<uid>/<token>/`          | ❌ No          |

---

## 📬 Request Payloads

### 1️⃣ User Register

```json
POST /api/register/
{
  "email": "djproject3@gmail.com",
  "name": "djproject",
  "password": "djproject@33",
  "password2": "djproject@33",
  "tc": "True"
}

```
### 2️⃣ User Login
```json

POST /api/login/
{
  "email": "djproject9@gmail.com",
  "password": "dj"
}
```

### 3️⃣ User Profile
```json

POST /api/login/
GET /api/profile/
Headers:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZ
```


### 4️⃣ Change Password
``` 
json

POST /api/changepassword/
Headers:
Authorization: Bearer <your-access-token>

{
  "password": "newpassword",
  "password2": "newpassword"
}

```
### 5️⃣ Send Reset Password Email
``` 
json

POST /api/send-reset-password-email/
{
  "email": "djproject9@gmail.com"
}


```
### 6️⃣ Reset Password (via Email Link)

``` 
json

POST /api/reset-password/<uid>/<token>/
{
  "password": "djproject",
  "password2": "djproject"
}


```

Example URL:
```
http://127.0.0.1:8000/api/reset-password/Mg/cmgw2z-301d625cd4a4926d8dcd5b490d61fc46/
```
