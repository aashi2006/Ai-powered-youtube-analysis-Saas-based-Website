# Debugging Authentication Issues

## Current Status
✅ User exists in database: test@example.com
✅ Password is hashed correctly
✅ Password verification works

## Common Issues & Solutions

### Issue 1: "Failed to create user" when signing up
**Cause:** User already exists
**Solution:** 
- The account already exists, so you should sign in instead
- Or use a different email address
- Or delete the existing user first

### Issue 2: "Invalid email or password" when signing in
**Possible Causes:**
1. **AUTH_SECRET missing or incorrect**
   - Check `.env` file has `AUTH_SECRET`
   - Restart dev server after adding it

2. **Server not running**
   - Make sure `npm run dev` is running
   - Check terminal for errors

3. **Browser cache/cookies**
   - Clear browser cookies
   - Try incognito/private window

4. **NextAuth configuration issue**
   - Check `auth.ts` file
   - Verify Prisma client is working

## Debugging Steps

### Step 1: Check if server is running
```bash
# Should see Next.js server output
npm run dev
```

### Step 2: Check environment variables
```bash
cat .env
# Should show:
# AUTH_SECRET=...
# AUTH_URL=http://localhost:3000
```

### Step 3: Check database
```bash
conda activate web
node check-users.js
```

### Step 4: Test password
```bash
conda activate web
node test-login.js
```

### Step 5: Check browser console
- Open browser DevTools (F12)
- Go to Console tab
- Look for errors when trying to sign in

### Step 6: Check server logs
- Look at terminal where `npm run dev` is running
- Check for any error messages

## Quick Fixes

### Reset User Password
```bash
conda activate web
node create-test-user.js
```

### Delete User and Recreate
```bash
conda activate web
node -e "const { PrismaClient } = require('@prisma/client'); const p = new PrismaClient(); (async () => { await p.user.deleteMany({ where: { email: 'test@example.com' } }); await p.\$disconnect(); console.log('User deleted'); })()"
```

Then create again:
```bash
node create-test-user.js
```

## Testing Login Directly

Try this curl command to test the API:
```bash
curl -X POST http://localhost:3000/api/auth/signin/credentials \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","redirect":"false"}'
```

