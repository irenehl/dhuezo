# Dhuezo Monorepo

A monorepo containing multiple Next.js landing pages and shared packages.

## 📁 Structure

```
├── apps/
│   ├── portfolio/          # Main portfolio landing page
│   └── ai-landing/         # AI services landing page
├── packages/
│   ├── ui/                 # Shared UI components (Button, ThemeProvider, etc.)
│   └── core/               # Shared utilities (cn, etc.)
└── package.json            # Root workspace configuration
```

## 🚀 Getting Started

### Installation

Install dependencies for all workspaces:

```bash
npm install
```

This will install dependencies for all apps and packages in the monorepo.

### Development

Run a specific app in development mode:

```bash
# Run portfolio app
npm run dev:portfolio

# Run AI landing app
npm run dev:ai
```

Each app runs on its own port:
- Portfolio: `http://localhost:3000`
- AI Landing: `http://localhost:3001` (or next available port)

### Building

Build a specific app:

```bash
# Build portfolio
npm run build:portfolio

# Build AI landing
npm run build:ai

# Build all apps
npm run build:all
```

### Linting

Lint all workspaces:

```bash
npm run lint:all
```

## 📦 Workspaces

### Apps

#### `apps/portfolio`
The main portfolio landing page with:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- Internationalization (i18n) with next-intl
- Dark mode support
- Blog functionality
- Project showcase

#### `apps/ai-landing`
A new AI-focused landing page with:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- Dark mode support
- Uses shared packages from `packages/`

### Packages

#### `packages/ui`
Shared UI components that can be used across all apps:
- `Button` component
- `ThemeProvider` component
- More components can be added here

#### `packages/core`
Shared utilities and helpers:
- `cn` utility function for className merging

## 🌐 Deployment on Vercel

This monorepo is configured to deploy each app separately on Vercel.

### Setup

1. **Create Vercel Projects**:
   - Create a project for `portfolio` in Vercel dashboard
   - Create a project for `ai-landing` in Vercel dashboard

2. **Configure Root Directory**:
   - For the `portfolio` project: Set **Root Directory** to `apps/portfolio`
   - For the `ai-landing` project: Set **Root Directory** to `apps/ai-landing`

3. **Domain Configuration**:
   - Attach your main domain (e.g., `yourdomain.com`) to the `portfolio` project
   - Attach subdomains (e.g., `ai.yourdomain.com`) to the `ai-landing` project
   - **Note**: Subdomains work on Vercel's free Hobby plan - no Pro plan required!

### Vercel Configuration Files

Each app has its own `vercel.json` with the correct root directory:
- `apps/portfolio/vercel.json`
- `apps/ai-landing/vercel.json`

## 🛠️ Tech Stack

- **Framework**: Next.js 15+
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Package Management**: npm workspaces
- **Deployment**: Vercel

## 📝 Adding a New App

1. Create a new directory under `apps/`:
   ```bash
   mkdir apps/new-landing
   ```

2. Initialize a Next.js app in that directory

3. Add a `package.json` with the app name following `@dhuezo/` convention

4. Update root `package.json` scripts to include dev/build commands for the new app

5. Create a Vercel project pointing to `apps/new-landing`

## 🔧 Shared Code

To share code between apps:

1. **UI Components**: Add to `packages/ui/src/components/`
2. **Utilities**: Add to `packages/core/src/`
3. **Import**: Use `@dhuezo/ui` or `@dhuezo/core` in your app

Example:
```typescript
import { Button } from '@dhuezo/ui'
import { cn } from '@dhuezo/core'
```

## 📄 License

MIT
