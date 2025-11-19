# Quick Testing Reference

## 🚀 Start Testing (3 Commands)

```bash
# 1. Activate environment
conda activate web

# 2. Start server
npm run dev

# 3. Open browser
# Go to: http://localhost:3000
```

---

## ✅ Quick Verification (5 Steps)

### 1. Test Sign Up
- Go to: `http://localhost:3000/signup`
- Create account: test@example.com / test123
- ✅ Should redirect to login with success message

### 2. Test Sign In
- Go to: `http://localhost:3000/login`
- Sign in: test@example.com / test123
- ✅ Should redirect to dashboard

### 3. Test Protected Route
- While logged in: Go to `/billing`
- ✅ Should work
- Sign out, then try `/billing` again
- ✅ Should redirect to `/login`

### 4. Test Upgrade
- Sign in, go to `/billing`
- Click "Upgrade to Pro"
- ✅ Should show success message

### 5. Check Database
```bash
conda activate web
npx prisma studio
```
- ✅ Should see User and Subscription records

---

## 📋 Technologies Used (Quick Answer)

**If asked what you used:**

1. **NextAuth.js v5** - Authentication library
2. **Prisma ORM** - Database management
3. **SQLite** - Database
4. **bcryptjs** - Password hashing
5. **Next.js 16** - Framework
6. **TypeScript** - Type safety
7. **JWT** - Session tokens

**Security:**
- Passwords hashed with bcrypt
- JWT sessions in HTTP-only cookies
- Middleware route protection
- Server-side API validation

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| "AUTH_SECRET missing" | Check `.env` file exists |
| "Module not found" | Run `npm install` |
| "Database error" | Run `npx prisma generate` |
| "Not redirecting" | Clear browser cache/cookies |

---

## 📁 Key Files

- `auth.ts` - Auth configuration
- `middleware.ts` - Route protection
- `app/login/page.tsx` - Login page
- `app/signup/page.tsx` - Signup page
- `prisma/schema.prisma` - Database schema
- `.env` - Environment variables

---

**Full guides:**
- `TESTING_GUIDE.md` - Detailed step-by-step testing
- `TECHNOLOGY_STACK.md` - Complete technology explanation

