# API Documentation

## Endpoints :

List of available endpoints:

- `GET /users`
- `POST /users/register`
- `POST /users/login`
- `POST /users/auth`

&nbsp;

## 1. GET /users

Description:

- Get all Users from database 

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "username": "admin",
        "role": "Admin",
        "password": "ju3SpU",
        "createdAt": "2022-05-17T06:57:24.932Z",
        "updatedAt": "2022-05-17T06:57:24.932Z"
    },
    {
        "id": 2,
        "username": "kuproy",
        "role": "User",
        "password": "q3I6Hc",
        "createdAt": "2022-05-17T07:00:20.714Z",
        "updatedAt": "2022-05-17T07:00:20.714Z"
    }
]
```

&nbsp;

## 2. POST /users/register

Description:
- Add user to database

Body:
```json
{
    "username":"theusers",
    "role": "User"
}
```

_Response (201 - Created)_

```json
{
    "message": "ID 2 dengan username theusers telah dibuat"
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "registerFieldEmpty",
    "errCode": 7,
    "message": "Username or Role cannot be empty",
    "status": 400
}
OR
{
    "name": "SequelizeValidationError",
    "errCode": 11,
    "message": "Validation error: Role must be Admin or User",
    "status": 400
}
OR
{
    "name": "registerUsernameLength",
    "errCode": 8,
    "message": "Username length must be at least 4 characters",
    "status": 400
}
OR
{
    "name": "SequelizeUniqueConstraintError",
    "errCode": 9,
    "message": "Username already exist",
    "status": 400
}
```

&nbsp;

## 3. POST /users/login

- Description: user login
- Seed User (default)
```json
{
    "username":"admin",
    "password":"ju3SpU",
    "role":"Admin"
}
```

_Response (200 - OK)_

```json
{
    "ID": 1,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJpYXQiOjE2NTI3NzE4NzcsImV4cCI6MTY1MjgxNTA3N30.WBL5yCfzmoGtfi5xqMKar6X5uPoV1wP-TAGgG7SlgdM",
    "expired_at": "Rabu, 18 Mei 2022 02.17.57 Waktu Indonesia Barat",
    "username": "admin"
}
```

_Response (404 - Not Found)_

```json
{
    "name": "invalidUserusername",
    "errCode": 5,
    "message": "Invalid password or username",
    "status": 404
}
```

_Response (400 - Bad Request)_

```json
{
    "name": "loginFieldEmpty",
    "errCode": 4,
    "message": "Username or Password cannot be empty",
    "status": 400
}
```

&nbsp;

## 4. - POST /users/auth

- Description: Get Job from database by ID

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
    "is_valid": true,
    "expired_at": "Rabu, 18 Mei 2022 02.23.07 Waktu Indonesia Barat",
    "username": "admin"
}
```

_Response (401 - Unauthorized)_

```json
{
    "name": "JsonWebTokenError",
    "errCode": 1,
    "message": "Invalid Authentication Token",
    "status": 401
}
OR
{
    "name": "TokenExpiredError",
    "errCode": 10,
    "message": "Current Token is expired. please Relogin",
    "status": 401
}
OR
{
    "name": "SyntaxError",
    "errCode": 6,
    "message": "Invalid Authentication Token",
    "status": 401
}
```

## Global Error

_Response (500 - Internal Server Error)_

```json
{
    "name": "TypeError",
    "errCode": "Global",
    "message": {
        "default": "Internal Server Error",
        "typeError": "some error message"
    },
    "status": 500
}
```