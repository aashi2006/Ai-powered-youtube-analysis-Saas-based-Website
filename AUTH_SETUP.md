# Authentication Setup Guide

## ✅ What's Been Set Up

1. **NextAuth.js** - Complete authentication system
2. **Prisma Models** - User, Account, Session, VerificationToken, and Subscription
3. **Login/Signup Pages** - Beautiful UI at `/login` and `/signup`
4. **Protected Routes** - All dashboard routes require authentication
5. **Session Management** - JWT-based sessions with user ID
6. **Database Migrations** - All tables created

## 🔧 Required Setup

### 1. Create `.env` file

Create a `.env` file in the root directory with:

```env
AUTH_SECRET=8Io8g53aBV/1NRPmLoSs9KzcV9PujgWli+cft3PHWGY=
AUTH_URL=http://localhost:3000
```

**Important:** The `AUTH_SECRET` above is a generated secret. For production, generate a new one:
```bash
openssl rand -base64 32
```

### 2. Start the Development Server

```bash
conda activate web
npm run dev
```

## 🚀 How to Use

### Sign Up
1. Navigate to `http://localhost:3000/signup`
2. Enter your name, email, and password (min 6 characters)
3. Click "Sign up"
4. You'll be redirected to login

### Sign In
1. Navigate to `http://localhost:3000/login`
2. Enter your email and password
3. Click "Sign in"
4. You'll be redirected to the dashboard

### Protected Routes
All these routes require authentication:
- `/dashboard`
- `/billing`
- `/content-generator`
- `/thumbnail-generator`
- `/thumbnail-search`
- `/trending-keywords`
- `/outlier-videos`

If not authenticated, users are redirected to `/login`.

### Upgrade to Pro
1. Sign in to your account
2. Go to `/billing`
3. Click "Upgrade to Pro"
4. The subscription is saved to the database with your user ID

## 🔐 Security Features

- ✅ Passwords are hashed with bcrypt
- ✅ JWT-based sessions
- ✅ Protected API routes
- ✅ Middleware protection for routes
- ✅ User ID included in session

## 📝 Database Schema

- **User** - Stores user accounts
- **Account** - OAuth accounts (for future OAuth providers)
- **Session** - Active sessions
- **VerificationToken** - Email verification tokens
- **Subscription** - User subscription plans

## 🧪 Testing

1. Create an account at `/signup`
2. Sign in at `/login`
3. Try accessing `/dashboard` - should work
4. Sign out using the button in the sidebar
5. Try accessing `/dashboard` - should redirect to `/login`
6. Go to `/billing` and click "Upgrade to Pro"
7. Check the database using Prisma Studio:
   ```bash
   conda activate web
   npx prisma studio
   ```

## 🐛 Troubleshooting

### "AUTH_SECRET is missing"
- Make sure you created a `.env` file with `AUTH_SECRET`

### "Cannot find module 'next-auth/react'"
- Run: `conda activate web && npm install next-auth@beta`

### Database errors
- Run migrations: `conda activate web && npx prisma migrate dev`
- Generate Prisma client: `conda activate web && npx prisma generate`

### Session not persisting
- Check that `AUTH_SECRET` is set in `.env`
- Clear browser cookies and try again

