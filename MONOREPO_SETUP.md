# Monorepo Setup Complete

This document summarizes the monorepo migration that has been completed.

## What Was Done

### 1. Workspace Configuration
- ✅ Converted root `package.json` to use npm workspaces
- ✅ Created `apps/` directory for Next.js applications
- ✅ Created `packages/` directory for shared code
- ✅ Added workspace scripts for development and building

### 2. Portfolio App Migration
- ✅ Moved existing Next.js app to `apps/portfolio/`
- ✅ Created `apps/portfolio/package.json` with all dependencies
- ✅ Updated `apps/portfolio/vercel.json` with correct root directory
- ✅ Preserved all existing functionality (i18n, blog, components, etc.)
- ✅ Updated Tailwind config to include shared packages path

### 3. New AI Landing App
- ✅ Created `apps/ai-landing/` with Next.js 15 setup
- ✅ Configured Tailwind CSS and shadcn/ui
- ✅ Set up dark mode support
- ✅ Created basic landing page structure
- ✅ Created `apps/ai-landing/vercel.json` for Vercel deployment

### 4. Shared Packages
- ✅ Created `packages/core/` for shared utilities (`cn` function)
- ✅ Created `packages/ui/` for shared UI components (Button, ThemeProvider)
- ✅ Configured TypeScript paths for package imports
- ✅ Updated `apps/ai-landing` to use shared packages

### 5. Configuration Updates
- ✅ Updated root `.gitignore` for monorepo structure
- ✅ Created comprehensive `README.md` with monorepo documentation
- ✅ Each app has its own `.eslintrc.json` and `.gitignore`

## Project Structure

```
dhuezo/
├── apps/
│   ├── portfolio/          # Your existing portfolio site
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── content/
│   │   ├── i18n/
│   │   ├── messages/
│   │   ├── types/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   └── vercel.json
│   │
│   └── ai-landing/         # New AI landing page
│       ├── app/
│       ├── components/
│       ├── lib/
│       ├── public/
│       ├── package.json
│       ├── next.config.js
│       ├── tsconfig.json
│       └── vercel.json
│
├── packages/
│   ├── core/               # Shared utilities
│   │   ├── src/
│   │   │   ├── utils.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── ui/                 # Shared UI components
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/
│       │   │   └── layout/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── package.json            # Root workspace config
├── README.md               # Updated documentation
└── .gitignore             # Updated for monorepo
```

## Next Steps

### 1. Install Dependencies
Run from the root:
```bash
npm install
```

This will install all dependencies for all workspaces.

### 2. Test Locally
```bash
# Test portfolio app
npm run dev:portfolio

# Test AI landing app (in another terminal)
npm run dev:ai
```

### 3. Vercel Setup

#### For Portfolio App:
1. Go to Vercel dashboard
2. Create a new project (or update existing)
3. Connect your Git repository
4. Set **Root Directory** to `apps/portfolio`
5. Deploy

#### For AI Landing App:
1. Go to Vercel dashboard
2. Create a new project
3. Connect the same Git repository
4. Set **Root Directory** to `apps/ai-landing`
5. Add your subdomain (e.g., `ai.yourdomain.com`)
6. Deploy

### 4. Domain Configuration

**Portfolio (Main Domain):**
- Domain: `yourdomain.com`
- Vercel Project: `portfolio`
- Root Directory: `apps/portfolio`

**AI Landing (Subdomain):**
- Domain: `ai.yourdomain.com`
- Vercel Project: `ai-landing`
- Root Directory: `apps/ai-landing`

**Note:** Subdomains work on Vercel's free Hobby plan - no Pro plan required!

## Using Shared Packages

To use shared components in any app:

```typescript
// Import from shared UI package
import { Button, ThemeProvider } from '@dhuezo/ui'

// Import from shared core package
import { cn } from '@dhuezo/core'
```

## Adding More Apps

To add another landing page:

1. Create `apps/new-app-name/`
2. Initialize Next.js app there
3. Add `package.json` with name `@dhuezo/new-app-name`
4. Add scripts to root `package.json`:
   ```json
   "dev:new-app": "npm run dev --workspace apps/new-app-name",
   "build:new-app": "npm run build --workspace apps/new-app-name"
   ```
5. Create Vercel project pointing to `apps/new-app-name`

## Troubleshooting

### Port Conflicts
If ports conflict, Next.js will automatically use the next available port. You can also specify ports in each app's `package.json`:
```json
"dev": "next dev -p 3001"
```

### Workspace Dependencies
If you add a new dependency to a workspace, run `npm install` from the root to ensure it's properly linked.

### TypeScript Paths
If TypeScript can't resolve `@dhuezo/*` imports, check that:
1. The package exists in `packages/`
2. The package has a proper `package.json` with `main` and `types`
3. The app's `tsconfig.json` has the correct paths configured

## Notes

- The root `package.json` still contains dependencies for backward compatibility. These can be removed later if desired, as each workspace manages its own dependencies.
- Both apps can run simultaneously on different ports.
- Shared packages are automatically linked via npm workspaces.
- Each app is completely independent and can be deployed separately.
