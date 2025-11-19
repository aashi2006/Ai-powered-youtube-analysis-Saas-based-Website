# Troubleshooting Guide

## Current Issue: Can't Sign In

### ✅ What We Know Works:
- User exists in database: `test@example.com`
- Password is hashed correctly
- Password verification works (tested with script)

### 🔍 Debugging Steps

#### Step 1: Check if Dev Server is Running
```bash
conda activate web
npm run dev
```

**Look for:**
- Server should start on `http://localhost:3000`
- No error messages about AUTH_SECRET
- No database connection errors

#### Step 2: Check Environment Variables
The `.env` file should exist and contain:
```
AUTH_SECRET=8Io8g53aBV/1NRPmLoSs9KzcV9PujgWli+cft3PHWGY=
AUTH_URL=http://localhost:3000
```

**If missing, create it:**
```bash
echo "AUTH_SECRET=8Io8g53aBV/1NRPmLoSs9KzcV9PujgWli+cft3PHWGY=" > .env
echo "AUTH_URL=http://localhost:3000" >> .env
```

**Then restart the server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

#### Step 3: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to sign in
4. Look for any red error messages

#### Step 4: Check Server Terminal
When you try to sign in, look at the terminal where `npm run dev` is running.

**You should see:**
- `✅ Login successful for: test@example.com` (if working)
- `❌ User not found` (if user doesn't exist)
- `❌ Password mismatch` (if password is wrong)
- `❌ Auth error:` (if there's a problem)

#### Step 5: Clear Browser Data
Sometimes cookies/cache cause issues:

1. **Clear cookies:**
   - Chrome: Settings → Privacy → Clear browsing data → Cookies
   - Or use Incognito/Private window

2. **Hard refresh:**
   - Windows/Linux: Ctrl + Shift + R
   - Mac: Cmd + Shift + R

#### Step 6: Test with Different Browser
Try signing in with a different browser or incognito mode to rule out browser-specific issues.

---

## Common Error Messages & Solutions

### "User with this email already exists"
**Meaning:** You're trying to sign up with an email that's already registered.

**Solution:**
- Sign in instead of signing up
- Or use a different email
- Or delete the user first (see below)

### "Failed to create user"
**Possible causes:**
1. User already exists (see above)
2. Database connection issue
3. Missing required fields

**Solution:**
- Check the detailed error message (now shows more info)
- Check server terminal for errors
- Verify database is accessible: `node check-users.js`

### "Invalid email or password"
**Possible causes:**
1. Wrong password
2. Email doesn't exist
3. AUTH_SECRET missing
4. Server not running properly

**Solution:**
1. Verify credentials: `test@example.com` / `test123`
2. Check AUTH_SECRET in `.env`
3. Restart dev server
4. Check server terminal for auth logs

### "AUTH_SECRET is missing"
**Solution:**
```bash
# Create .env file
cat > .env << EOF
AUTH_SECRET=8Io8g53aBV/1NRPmLoSs9KzcV9PujgWli+cft3PHWGY=
AUTH_URL=http://localhost:3000
EOF

# Restart server
npm run dev
```

---

## Quick Fixes

### Fix 1: Reset User Password
```bash
conda activate web
node create-test-user.js
```

### Fix 2: Delete and Recreate User
```bash
conda activate web
node -e "const { PrismaClient } = require('@prisma/client'); const p = new PrismaClient(); (async () => { await p.user.deleteMany({ where: { email: 'test@example.com' } }); await p.subscription.deleteMany({ where: { userId: { in: (await p.user.findMany({ where: { email: 'test@example.com' } })).map(u => u.id) } } }); await p.\$disconnect(); console.log('User deleted'); })()"

# Then recreate
node create-test-user.js
```

### Fix 3: Check Database Connection
```bash
conda activate web
node check-users.js
```

### Fix 4: Regenerate Prisma Client
```bash
conda activate web
npx prisma generate
```

---

## Testing Checklist

Before reporting an issue, check:

- [ ] Dev server is running (`npm run dev`)
- [ ] `.env` file exists with AUTH_SECRET
- [ ] User exists in database (`node check-users.js`)
- [ ] Password is correct (`test123`)
- [ ] Browser console shows no errors
- [ ] Server terminal shows no errors
- [ ] Tried clearing cookies/cache
- [ ] Tried incognito/private window

---

## Still Not Working?

If you've tried everything above:

1. **Check server terminal output** - Look for error messages
2. **Check browser console** - Look for JavaScript errors
3. **Share the exact error message** you're seeing
4. **Share what appears in server terminal** when you try to sign in

The auth system now has better logging, so you should see helpful messages in the server terminal when you try to sign in.

