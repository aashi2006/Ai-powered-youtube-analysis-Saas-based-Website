# Technology Stack & Implementation Details

## Authentication System Overview

This project implements a **complete authentication system** using industry-standard technologies and best practices.

---

## Core Technologies Used

### 1. **NextAuth.js (Auth.js) v5 (Beta)**
   - **What it is:** The most popular authentication library for Next.js
   - **Version:** NextAuth.js v5 (beta) - latest version for Next.js App Router
   - **Why used:** 
     - Industry standard for Next.js authentication
     - Handles sessions, JWT tokens, and security automatically
     - Supports multiple authentication providers
   - **Package:** `next-auth@beta`

### 2. **Prisma ORM**
   - **What it is:** Next-generation TypeScript ORM for database management
   - **Version:** Prisma 6.19.0
   - **Why used:**
     - Type-safe database queries
     - Automatic migrations
     - Excellent TypeScript support
     - Works seamlessly with NextAuth.js
   - **Packages:** 
     - `prisma@^6.19.0`
     - `@prisma/client@^6.19.0`
     - `@auth/prisma-adapter` (connects NextAuth to Prisma)

### 3. **SQLite Database**
   - **What it is:** Lightweight, file-based relational database
   - **Why used:**
     - No server setup required
     - Perfect for development
     - Easy to backup (single file)
     - Fast and reliable
   - **Location:** `prisma/dev.db`

### 4. **bcryptjs**
   - **What it is:** Password hashing library
   - **Why used:**
     - Industry standard for password security
     - One-way hashing (passwords cannot be decrypted)
     - Protects user passwords in database
   - **Package:** `bcryptjs` with `@types/bcryptjs`

### 5. **Next.js 16.0.3 (App Router)**
   - **What it is:** React framework with server-side rendering
   - **Why used:**
     - Modern App Router architecture
     - Server Components and Client Components
     - Built-in API routes
     - Middleware support for route protection

### 6. **TypeScript**
   - **What it is:** Typed superset of JavaScript
   - **Why used:**
     - Type safety
     - Better IDE support
     - Catches errors at compile time

---

## Authentication Flow Architecture

### 1. **Registration Flow**
```
User → Signup Page → /api/register → bcrypt.hash() → Prisma User.create() → Redirect to Login
```

**Components:**
- `app/signup/page.tsx` - Signup UI
- `app/api/register/route.ts` - Registration API endpoint
- `bcryptjs` - Password hashing
- `prisma.user.create()` - Database user creation

### 2. **Login Flow**
```
User → Login Page → signIn() → NextAuth → Credentials Provider → bcrypt.compare() → JWT Token → Session
```

**Components:**
- `app/login/page.tsx` - Login UI
- `next-auth/react` - Client-side auth hooks
- `auth.ts` - NextAuth configuration
- `Credentials` provider - Email/password authentication
- JWT session strategy

### 3. **Session Management**
```
Request → Middleware → auth() → JWT Token → Session Object → Protected Route
```

**Components:**
- `middleware.ts` - Route protection
- `auth.ts` - Session retrieval
- JWT tokens stored in cookies
- Session includes user ID, email, name

### 4. **Route Protection**
```
Unauthenticated User → Protected Route → Middleware → Redirect to /login
Authenticated User → Protected Route → Allow Access
```

**Components:**
- `middleware.ts` - Checks authentication status
- Protected routes: `/dashboard`, `/billing`, `/content-generator`, etc.

---

## Database Schema

### Models Created:

1. **User Model**
   - Stores user accounts (email, password hash, name)
   - One-to-one relationship with Subscription
   - One-to-many with Account and Session

2. **Account Model**
   - For OAuth providers (Google, GitHub, etc.) - future expansion
   - Linked to User

3. **Session Model**
   - Active user sessions
   - Linked to User
   - Managed by NextAuth.js

4. **VerificationToken Model**
   - Email verification tokens
   - Used for password reset, email verification

5. **Subscription Model**
   - User subscription plans (Free/Pro)
   - Linked to User via userId
   - Stores plan, cadence, status, expiration

---

## Key Files & Their Purpose

### Configuration Files
- `auth.ts` - Main NextAuth configuration
- `auth.config.ts` - Auth configuration (callbacks, pages)
- `middleware.ts` - Route protection middleware
- `.env` - Environment variables (AUTH_SECRET, AUTH_URL)

### API Routes
- `app/api/auth/[...nextauth]/route.ts` - NextAuth API handler
- `app/api/register/route.ts` - User registration endpoint
- `app/api/upgrade/route.ts` - Subscription upgrade (protected)

### UI Pages
- `app/login/page.tsx` - Login page
- `app/signup/page.tsx` - Signup page
- `app/(dashboard)/billing/page.tsx` - Billing page (protected)

### Database
- `prisma/schema.prisma` - Database schema definition
- `lib/prisma.ts` - Prisma client singleton
- `lib/auth.ts` - Auth utility functions

### Components
- `components/Providers.tsx` - SessionProvider wrapper
- `components/Sidebar.tsx` - Shows user info and logout

### Type Definitions
- `types/next-auth.d.ts` - TypeScript types for NextAuth session

---

## Security Features Implemented

1. **Password Hashing**
   - Passwords hashed with bcrypt (10 rounds)
   - Never stored in plain text
   - One-way encryption

2. **JWT Sessions**
   - Stateless authentication
   - Tokens signed with AUTH_SECRET
   - Stored in HTTP-only cookies

3. **Route Protection**
   - Middleware checks authentication
   - Server-side route protection
   - Automatic redirects

4. **API Protection**
   - Protected endpoints check session
   - User ID from session, not client input
   - Prevents unauthorized access

5. **Input Validation**
   - Email format validation
   - Password length requirements
   - Required field checks

---

## Environment Variables

```env
AUTH_SECRET=8Io8g53aBV/1NRPmLoSs9KzcV9PujgWli+cft3PHWGY=
AUTH_URL=http://localhost:3000
```

- **AUTH_SECRET:** Used to sign and encrypt JWT tokens
- **AUTH_URL:** Base URL for authentication callbacks

---

## Dependencies Installed

### Production Dependencies
```json
{
  "next-auth": "beta",
  "@auth/prisma-adapter": "latest",
  "bcryptjs": "latest",
  "@prisma/client": "^6.19.0",
  "prisma": "^6.19.0"
}
```

### Development Dependencies
```json
{
  "@types/bcryptjs": "latest"
}
```

---

## Authentication Methods Supported

### Currently Implemented
- ✅ **Credentials (Email/Password)** - Fully functional

### Ready for Future Expansion
- 🔄 OAuth providers (Google, GitHub, etc.)
- 🔄 Email verification
- 🔄 Password reset
- 🔄 Two-factor authentication

---

## Session Strategy

**JWT (JSON Web Tokens)**
- Stateless authentication
- No database queries for session validation
- Fast and scalable
- Token includes: user ID, email, name

---

## How It All Works Together

1. **User Registration:**
   - User fills signup form
   - Password hashed with bcrypt
   - User record created in database
   - Default "Free" subscription created

2. **User Login:**
   - User enters credentials
   - NextAuth validates with database
   - JWT token created and stored in cookie
   - Session object created with user info

3. **Accessing Protected Routes:**
   - Middleware checks for valid session
   - If authenticated: allow access
   - If not: redirect to login

4. **API Calls:**
   - Server-side `auth()` function gets session
   - User ID extracted from session
   - Used for database operations (e.g., upgrade subscription)

5. **Logout:**
   - Session destroyed
   - Cookie cleared
   - Redirect to login page

---

## If Asked About Implementation

**"What authentication system did you use?"**
- NextAuth.js (Auth.js v5) - the industry standard for Next.js applications

**"How are passwords stored?"**
- Passwords are hashed using bcryptjs with 10 salt rounds before storing in the database

**"How does session management work?"**
- JWT-based sessions stored in HTTP-only cookies, validated server-side

**"How are routes protected?"**
- Next.js middleware checks authentication status before allowing access to protected routes

**"What database did you use?"**
- SQLite with Prisma ORM for type-safe database operations

**"Is it secure?"**
- Yes, includes password hashing, JWT tokens, route protection, and API endpoint security

---

## Summary

This is a **production-ready authentication system** using:
- ✅ Industry-standard libraries (NextAuth.js)
- ✅ Secure password storage (bcrypt)
- ✅ Type-safe database operations (Prisma)
- ✅ Modern Next.js patterns (App Router, Server Components)
- ✅ Comprehensive security measures
- ✅ Scalable architecture

The system is fully functional and ready for production use with proper environment configuration.

