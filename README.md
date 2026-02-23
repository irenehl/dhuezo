# Dhuezo Monorepo

A monorepo containing multiple Next.js landing pages and shared packages.

## 📁 Structure

```
├── apps/
│   ├── portfolio/          # Main portfolio landing page
│   ├── ai-landing/         # AI services landing page
│   └── food-dice/          # Food Dice app
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
A comprehensive portfolio website featuring:

**Core Features:**
- Next.js 15 with App Router
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui components
- Internationalization (i18n) with next-intl (English/Spanish)
- Dark mode support (default theme)
- Responsive design

**Sections & Pages:**
- **Hero Section**: Animated introduction with CTA buttons
- **Projects Section**: Interactive carousel with filtering (Web/Mobile/AI categories)
  - Markdown-based project content management
  - Featured projects highlighting
  - Project detail pages with full content
- **Skills Section**: Categorized technical skills display (Frontend, Backend, Tools)
- **Timeline Section**: Work experience timeline with markdown content
- **Stage Section**: Blog/writing showcase with posts, talks, and articles
- **About Section**: Personal introduction with social links and favorites

**Blog System:**
- Markdown-based blog posts
- Blog listing page (`/[locale]/blog`)
- Individual blog post pages (`/[locale]/blog/[slug]`)
- Table of contents (TOC) generation
- Reading time calculation
- Syntax highlighting for code blocks
- Tag support

**Content Management:**
- Markdown file parsing with frontmatter
- Consolidated project files (`projects.en.md`, `projects.es.md`)
- Experience entries from markdown
- Blog posts from markdown
- Image optimization and normalization

**UI Components:**
- Custom carousel component with autoplay
- Animated sections with stagger effects
- Scroll reveal image component
- Custom cursor effects
- Floating decorative elements
- Background layers and animations
- Mobile-responsive navigation menu
- Language switcher (EN/ES)
- Theme toggle (dark/light)

**SEO & Analytics:**
- Dynamic metadata generation
- Open Graph images
- JSON-LD structured data
- Sitemap generation
- Robots.txt
- Microsoft Clarity analytics integration

**Additional Features:**
- Konami code easter egg
- Custom fonts (Lora, DM Sans, Caveat)
- Toast notifications
- Dialog components
- Scroll areas
- Toast system

#### `apps/ai-landing`
An AI services landing page featuring:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- Dark mode support
- Hero section
- Features section
- Problem/Solution section
- Philosophy section
- Tech stack section
- CTA sections
- Support section
- Ambient background effects
- Uses shared packages from `packages/`

#### `apps/food-dice`
A food decision app with:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- Hero section
- Problem section
- How it works section
- Features section
- Testimonials section
- Support section
- CTA sections

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

### Core Technologies
- **Framework**: Next.js 15.5.9+ with App Router
- **Language**: TypeScript 5.6+ (strict mode)
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Package Management**: npm workspaces
- **Deployment**: Vercel

### Key Libraries & Tools
- **Internationalization**: next-intl 4.5+
- **Animations**: framer-motion 11.11+
- **Markdown**: gray-matter, react-markdown, remark/rehype plugins
- **Syntax Highlighting**: react-syntax-highlighter
- **Date Handling**: date-fns 4.1+
- **Icons**: lucide-react
- **Theme Management**: next-themes
- **Analytics**: Microsoft Clarity
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 📝 Adding a New App

1. Create a new directory under `apps/`:
   ```bash
   mkdir apps/new-landing
   ```

2. Initialize a Next.js app in that directory

3. Add a `package.json` with the app name following `@dhuezo/` convention

4. Update root `package.json` scripts to include dev/build commands for the new app:
   ```json
   "dev:new-landing": "npm run dev --workspace apps/new-landing",
   "build:new-landing": "npm run build --workspace apps/new-landing"
   ```

5. Create a Vercel project pointing to `apps/new-landing`

## 📚 Portfolio App Structure

### Content Organization
```
apps/portfolio/
├── content/
│   ├── projects/          # Project markdown files
│   │   ├── projects.en.md # Consolidated English projects
│   │   └── projects.es.md # Consolidated Spanish projects
│   ├── experience/        # Work experience markdown files
│   └── blog/             # Blog post markdown files
├── components/
│   ├── sections/         # Page sections (Hero, Projects, Skills, etc.)
│   ├── layout/           # Layout components (Header, Footer, etc.)
│   ├── ui/               # Reusable UI components
│   ├── blog/             # Blog-specific components
│   ├── icons/            # Custom icon components
│   ├── seo/              # SEO components (JSON-LD)
│   └── analytics/        # Analytics components
├── lib/
│   ├── services/         # Data services (blog, projects, experience)
│   ├── markdown/         # Markdown parsing utilities
│   ├── config/           # Configuration files
│   ├── analytics/        # Analytics utilities
│   └── utils/            # Utility functions
└── app/
    └── [locale]/         # Internationalized routes
        ├── page.tsx       # Home page
        ├── blog/         # Blog routes
        └── projects/     # Project detail routes
```

### Key Services
- **project-content-service**: Manages project data from markdown files
- **blog-service**: Handles blog post retrieval and parsing
- **experience-service**: Manages work experience timeline data
- **markdown utilities**: Parses markdown files with frontmatter support

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

## 🎨 Design Features

### Portfolio App Design
- Custom color palette with warm, earthy tones
- Smooth animations and transitions
- Responsive grid layouts
- Custom cursor effects
- Decorative elements and textures
- Gradient accents
- Hover effects and micro-interactions

### Typography
- **Display Font**: Lora (headings)
- **Body Font**: DM Sans
- **Accent Font**: Caveat (decorative elements)

## 🔧 Development Scripts

```bash
# Development
npm run dev:portfolio      # Run portfolio app
npm run dev:ai            # Run AI landing app
npm run dev:food-dice     # Run food dice app

# Building
npm run build:portfolio   # Build portfolio app
npm run build:ai          # Build AI landing app
npm run build:food-dice   # Build food dice app
npm run build:all         # Build all apps

# Linting
npm run lint:all          # Lint all workspaces

# Analysis (portfolio only)
npm run analyze           # Bundle size analysis
```

## 📄 License

MIT
