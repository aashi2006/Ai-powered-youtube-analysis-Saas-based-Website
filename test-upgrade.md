# Testing the Upgrade to Pro Functionality

## Method 1: Test via the UI (Recommended)

1. **Start the development server** (using conda env "web"):
   ```bash
   conda activate web
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:3000/billing
   ```

3. **Test the upgrade button**:
   - Click the "Upgrade to Pro" button
   - You should see "Processing..." while it's working
   - A success message should appear at the top: "Successfully upgraded to Pro plan (Monthly)"
   - The button should become enabled again

4. **Try different cadences**:
   - Switch between "Monthly" and "Yearly" using the toggle
   - Click "Upgrade to Pro" again
   - The database should update with the new cadence

## Method 2: Check the Database Directly

### Option A: Using Prisma Studio (Visual Database Browser)

```bash
conda activate web
npx prisma studio
```

This will open a web interface at `http://localhost:5555` where you can:
- View all subscriptions
- See the data that was created
- Edit records if needed

### Option B: Using a Script

Run the test script:
```bash
conda activate web
node test-db.js
```

## Method 3: Test the API Directly

You can test the API endpoint using curl:

```bash
curl -X POST http://localhost:3000/api/upgrade \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-123",
    "plan": "Pro",
    "cadence": "Monthly"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Successfully upgraded to Pro plan (Monthly)",
  "subscription": {
    "id": "...",
    "userId": "user-123",
    "plan": "Pro",
    "cadence": "Monthly",
    "status": "active",
    ...
  }
}
```

## What to Check

✅ **Button click works** - No console errors
✅ **Success message appears** - Green message at top of page
✅ **Database record created** - Check using Prisma Studio or test script
✅ **Multiple clicks update** - Second click should update existing record, not create duplicate
✅ **Different cadences work** - Monthly and Yearly both save correctly

