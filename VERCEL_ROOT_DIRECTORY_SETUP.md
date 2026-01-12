# How to Fix Vercel Build Error: "vite build" command not found

## The Problem

Vercel is trying to run `vite build` because it's building from the repository root instead of the app directory. This happens when **Root Directory** is not set in your Vercel project settings.

## The Solution: Set Root Directory in Vercel Dashboard

You **MUST** set the Root Directory for each Vercel project. This cannot be done via code - it must be configured in the Vercel dashboard.

### Step-by-Step Instructions

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Log in if needed

2. **Select Your Project**
   - Click on the project that's failing (food-dice, ai-landing, or portfolio)

3. **Open Project Settings**
   - Click on **Settings** tab (in the top navigation)
   - Or go to: `https://vercel.com/[your-team]/[project-name]/settings`

4. **Find Root Directory Setting**
   - Scroll down to the **General** section
   - Look for **Root Directory** field
   - It's usually near the top of the General settings

5. **Set the Root Directory**
   - Click on the Root Directory field
   - Enter the path to your app:
     - For **food-dice** project: `apps/food-dice`
     - For **ai-landing** project: `apps/ai-landing`
     - For **portfolio** project: `apps/portfolio`
   - **Important:** Do NOT include a leading slash, just `apps/food-dice` not `/apps/food-dice`

6. **Save Changes**
   - Click **Save** button
   - Vercel will automatically trigger a new deployment

7. **Verify the Build**
   - Go to the **Deployments** tab
   - Watch the new deployment
   - It should now build successfully!

## Visual Guide

The Root Directory field looks like this in Vercel dashboard:

```
┌─────────────────────────────────────┐
│ General                             │
├─────────────────────────────────────┤
│ Root Directory                      │
│ [apps/food-dice          ] [Save]  │
│                                      │
│ Leave empty to use repository root  │
└─────────────────────────────────────┘
```

## For Each Project

You need to do this for **EACH** of your three projects:

1. **food-dice** → Root Directory: `apps/food-dice`
2. **ai-landing** → Root Directory: `apps/ai-landing`  
3. **portfolio** → Root Directory: `apps/portfolio`

## Verification

After setting Root Directory, Vercel will:
- ✅ Change to the app directory before building
- ✅ Read `vercel.json` from that directory
- ✅ Run `npm run build` (not `vite build`)
- ✅ Use Next.js framework configuration

## Why This Happens

When Root Directory is **not set**:
- Vercel builds from repository root (`/`)
- Looks for `vercel.json` at root (doesn't exist)
- Looks for `build` script in root `package.json` (doesn't exist)
- Tries to auto-detect framework → incorrectly detects Vite
- Tries to run `vite build` → fails because Vite isn't installed

When Root Directory **is set**:
- Vercel changes to `apps/food-dice` directory
- Finds `vercel.json` with correct configuration
- Runs `npm run build` which executes `next build`
- Build succeeds! ✅

## Still Having Issues?

If you've set Root Directory but still getting errors:

1. **Double-check the path** - Make sure there are no typos
2. **Check for trailing slashes** - Should be `apps/food-dice` not `apps/food-dice/`
3. **Redeploy manually** - Go to Deployments → Click "Redeploy" on latest deployment
4. **Check build logs** - Look for which directory Vercel is building from

## Quick Test

After setting Root Directory, you can verify locally:

```bash
cd apps/food-dice
npm run build
```

If this works locally, it will work on Vercel once Root Directory is set correctly.
