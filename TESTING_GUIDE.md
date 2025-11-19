# Step-by-Step Testing Guide for Authentication

## Prerequisites Check

### Step 1: Verify Environment Setup
```bash
# Make sure you're in the project directory
cd "/Users/parth/Documents/Work/Code/College/FST miniproject/Ai-powered-youtube-analysis-Saas-based-Website"

# Activate conda environment
conda activate web

# Verify .env file exists
cat .env
```

**Expected Output:**
```
AUTH_SECRET=8Io8g53aBV/1NRPmLoSs9KzcV9PujgWli+cft3PHWGY=
AUTH_URL=http://localhost:3000
```

If the file doesn't exist or is missing AUTH_SECRET, create it with the above content.

---

## Testing Steps

### Step 2: Start the Development Server
```bash
conda activate web
npm run dev
```

**Expected Output:**
```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
- Ready in X seconds
```

**✅ Success Indicator:** Server starts without errors

---

### Step 3: Test Home Page Redirect (Not Logged In)

1. Open your browser
2. Navigate to: `http://localhost:3000`
3. **Expected Behavior:** Automatically redirects to `http://localhost:3000/login`

**✅ Success Indicator:** You see the login page, not the dashboard

---

### Step 4: Create Test Account

**IMPORTANT:** You need to create an account before you can sign in!

#### Option A: Use the Sign Up Page (Recommended)
1. On the login page, click **"Sign up"** link (or go to `http://localhost:3000/signup`)
2. Fill in the form:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Password:** test123 (minimum 6 characters)
3. Click **"Sign up"** button

**Expected Behavior:**
- Button shows "Creating account..." briefly
- Redirects to `/login?registered=true`
- Green success message appears: "Account created successfully! Please sign in."

**✅ Success Indicator:** 
- No error messages
- Success message appears
- Redirected to login page

#### Option B: Create Test User via Script (Quick Setup)
If you want to skip the signup page, run:
```bash
conda activate web
node create-test-user.js
```

This creates the test account directly in the database.

**❌ If Error Occurs:**
- Check browser console (F12) for errors
- Check terminal for server errors
- Verify database is accessible
- Run `node check-users.js` to see if user exists

---

### Step 5: Test Sign In Flow

1. On the login page, enter credentials:
   - **Email:** test@example.com
   - **Password:** test123
2. Click **"Sign in"** button

**Expected Behavior:**
- Button shows "Signing in..." briefly
- Redirects to `/dashboard`
- You see the dashboard with sidebar

**✅ Success Indicator:**
- No error messages
- Dashboard loads successfully
- Sidebar shows "Signed in as: Test User" or email

**❌ If Error Occurs:**
- "Invalid email or password" → Check credentials
- Check browser console and terminal for errors

---

### Step 6: Test Protected Routes

1. **While logged in**, try accessing:
   - `http://localhost:3000/dashboard` → Should work ✅
   - `http://localhost:3000/billing` → Should work ✅
   - `http://localhost:3000/content-generator` → Should work ✅

2. **Sign out** (click "Sign out" button in sidebar)

3. **While logged out**, try accessing:
   - `http://localhost:3000/dashboard` → Should redirect to `/login` ✅
   - `http://localhost:3000/billing` → Should redirect to `/login` ✅

**✅ Success Indicator:** 
- Logged in: All routes accessible
- Logged out: All routes redirect to login

---

### Step 7: Test Upgrade to Pro Functionality

1. **Sign in** with your account (test@example.com / test123)
2. Navigate to: `http://localhost:3000/billing`
3. Click **"Upgrade to Pro"** button

**Expected Behavior:**
- Button shows "Processing..." briefly
- Green success message appears: "Successfully upgraded to Pro plan (Monthly)"
- Database record is created

**✅ Success Indicator:**
- Success message appears
- No error messages
- Button becomes enabled again

---

### Step 8: Verify Database Records

#### Option A: Using Prisma Studio (Visual)
```bash
conda activate web
npx prisma studio
```

1. Browser opens at `http://localhost:5555`
2. Click on **"User"** model
3. **Expected:** See your user record with email "test@example.com"
4. Click on **"Subscription"** model
5. **Expected:** See subscription record with:
   - userId matching your user ID
   - plan: "Pro"
   - cadence: "Monthly"
   - status: "active"

**✅ Success Indicator:** Records exist in database

#### Option B: Using Test Script
```bash
conda activate web
node test-db.js
```

**Expected Output:**
```
🔍 Checking database...

✅ Found X subscription(s):

--- Subscription 1 ---
ID: cmxxxxx...
User ID: cmxxxxx... (your user ID)
Plan: Pro
Cadence: Monthly
Status: active
...
```

**✅ Success Indicator:** Script shows your subscription

---

### Step 9: Test Session Persistence

1. **Sign in** to your account
2. **Refresh the page** (F5 or Cmd+R)
3. **Expected:** You remain logged in, dashboard still shows

4. **Close the browser tab**
5. **Open a new tab** and go to `http://localhost:3000`
6. **Expected:** 
   - If session expired: Redirects to login
   - If session active: Redirects to dashboard

**✅ Success Indicator:** Session persists across page refreshes

---

### Step 10: Test Error Handling

#### Test Invalid Login
1. Go to `/login`
2. Enter wrong password
3. Click "Sign in"
4. **Expected:** Red error message: "Invalid email or password"

#### Test Duplicate Sign Up
1. Go to `/signup`
2. Try to sign up with same email (test@example.com)
3. **Expected:** Red error message: "User with this email already exists"

#### Test Short Password
1. Go to `/signup`
2. Enter password less than 6 characters
3. **Expected:** Browser validation prevents submission

**✅ Success Indicator:** All error cases handled gracefully

---

## Quick Verification Checklist

- [ ] Server starts without errors
- [ ] Home page redirects to login when not authenticated
- [ ] Sign up creates account successfully
- [ ] Sign in works with correct credentials
- [ ] Dashboard accessible when logged in
- [ ] Protected routes redirect to login when logged out
- [ ] Sidebar shows user info and logout button
- [ ] "Upgrade to Pro" button works and saves to database
- [ ] Database records visible in Prisma Studio
- [ ] Session persists across page refreshes
- [ ] Error messages display correctly

---

## Troubleshooting

### Issue: "AUTH_SECRET is missing"
**Solution:** Create `.env` file with AUTH_SECRET (already done)

### Issue: "Cannot find module 'next-auth/react'"
**Solution:** 
```bash
conda activate web
npm install next-auth@beta
```

### Issue: Database errors
**Solution:**
```bash
conda activate web
npx prisma generate
npx prisma migrate dev
```

### Issue: Session not working
**Solution:**
- Clear browser cookies
- Restart dev server
- Check .env file has AUTH_SECRET

### Issue: "Unauthorized" when clicking Upgrade
**Solution:**
- Make sure you're signed in
- Check browser console for errors
- Verify session is active (check sidebar for user info)

---

## Testing Summary

After completing all steps, you should have verified:
1. ✅ User registration works
2. ✅ User authentication works
3. ✅ Route protection works
4. ✅ Session management works
5. ✅ Database integration works
6. ✅ Upgrade functionality works
7. ✅ Error handling works

If all checkboxes are marked, your authentication system is **fully functional**! 🎉

