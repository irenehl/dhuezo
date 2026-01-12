# Testing Vercel Builds Locally

## ⚠️ IMPORTANT: Root Directory Must Be Set in Vercel Dashboard

**This is a Vercel dashboard configuration issue, not a code issue.**

Even though your builds work locally, Vercel is still trying to run `vite build` because **Root Directory is not set** in your Vercel project settings.

## The Problem

Vercel is trying to run `vite build` because:
1. **Root Directory is not set** in Vercel dashboard ⚠️
2. Vercel builds from repository root
3. Root `package.json` has no `build` script
4. Vercel auto-detects framework incorrectly (thinks it's Vite)

## Solution: Set Root Directory in Vercel Dashboard

**You MUST do this in the Vercel dashboard - it cannot be fixed with code!**

See **[VERCEL_ROOT_DIRECTORY_SETUP.md](./VERCEL_ROOT_DIRECTORY_SETUP.md)** for detailed step-by-step instructions.

Quick steps:
1. Go to https://vercel.com/dashboard
2. Select your project → **Settings** → **General**
3. Set **Root Directory** to:
   - `apps/portfolio` for portfolio project
   - `apps/ai-landing` for ai-landing project  
   - `apps/food-dice` for food-dice project
4. **Save** (this triggers a new deployment)
5. Watch the deployment - it should now succeed!

## Testing Locally

### Option 1: Direct Build Test (Simplest - Recommended)

Just run the build command directly from the app directory. This simulates exactly what Vercel will do once Root Directory is set:

```bash
cd apps/food-dice
npm run build
```

If this works locally, it will work on Vercel once Root Directory is set in the dashboard.

### Option 2: Test Build Detection Script

```bash
# From repository root
node test-vercel-build.js food-dice
```

This shows what build command would be detected from different directories.

### Option 3: Vercel CLI (Requires Project Linking)

If you want to use Vercel CLI, you need to link the project first:

```bash
cd apps/food-dice
vercel link
# Select your existing project when prompted
vercel build
```

**Note:** Vercel CLI requires:
1. Linking to an existing Vercel project (`vercel link`)
2. OR pulling project settings (`vercel pull`)
3. Root Directory must be set in Vercel dashboard for this to work correctly

For quick testing, Option 1 (direct `npm run build`) is the simplest approach.

## Verification

After setting Root Directory in dashboard, Vercel will:
- Change to the app directory (e.g., `apps/food-dice`)
- Read `vercel.json` from that directory
- Run `npm run build` from that directory
- Use Next.js framework configuration

The build should succeed!

## Quick Test (Without Vercel CLI)

To verify the build works locally without Vercel CLI:

```bash
cd apps/food-dice
npm run build
```

If this succeeds locally, it will succeed on Vercel once Root Directory is set correctly in the dashboard.
