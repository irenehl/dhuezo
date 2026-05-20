# Unused Files Report

This document lists all files that can be safely deleted because they are not used in the codebase.

## Root Directory Files

### 1. Planning Documents (Kabuda Project)
These markdown files contain planning documentation for a completely different project called "Kabuda" (a loan and investment platform). They are not related to the current portfolio/landing pages monorepo.

- **File:** `/workspace/kabuda.md`
  - **Reason:** Contains planning docs for unrelated Kabuda project
  - **Safe to delete:** ✅ Yes

- **File:** `/workspace/kabuda-admin.md`
  - **Reason:** Contains admin planning for unrelated Kabuda project
  - **Safe to delete:** ✅ Yes

- **File:** `/workspace/kabuda-plan-completo.md`
  - **Reason:** Contains complete plan for unrelated Kabuda project
  - **Safe to delete:** ✅ Yes

### 2. Debug Log
- **File:** `/workspace/.cursor/debug.log`
  - **Reason:** Debug log file (3311 lines) that should not be tracked in version control
  - **Safe to delete:** ✅ Yes (also should be added to .gitignore)

## Unused Package

### `packages/core/`
The entire `@dhuezo/core` package is unused and can be deleted.

- **Package:** `/workspace/packages/core/`
- **Reason:** 
  - Listed as a dependency in `apps/ai-landing/package.json` and `apps/food-dice/package.json`
  - However, it's **never actually imported** anywhere in the codebase
  - Both apps have their own local `lib/utils.ts` files with the `cn` function instead of using `@dhuezo/core`
- **Safe to delete:** ✅ Yes
- **Files to delete:**
  - `/workspace/packages/core/src/index.ts`
  - `/workspace/packages/core/src/utils.ts`
  - `/workspace/packages/core/package.json`
  - `/workspace/packages/core/tsconfig.json`
  - `/workspace/packages/core/` (entire directory)
- **Additional cleanup needed:**
  - Remove `"@dhuezo/core": "*"` from `apps/ai-landing/package.json`
  - Remove `"@dhuezo/core": "*"` from `apps/food-dice/package.json`
  - Update `/workspace/README.md` to remove references to `packages/core`

## Portfolio App Unused Files

### 1. Components

- **File:** `/workspace/apps/portfolio/components/blog/MarkdownViewer.tsx`
  - **Reason:** Not imported anywhere in the codebase
  - **Safe to delete:** ✅ Yes
  - **Note:** This is a 150-line React component with markdown rendering functionality that's completely unused

### 2. Services

- **File:** `/workspace/apps/portfolio/lib/services/blog-service-server.ts`
  - **Reason:** Not imported anywhere in the codebase
  - **Safe to delete:** ✅ Yes
  - **Note:** Contains placeholder server-side blog service with unimplemented methods

- **File:** `/workspace/apps/portfolio/lib/services/project-service-server.ts`
  - **Reason:** Not imported anywhere in the codebase
  - **Safe to delete:** ✅ Yes
  - **Note:** Contains placeholder server-side project service with unimplemented methods

### 3. Analytics Utilities

- **File:** `/workspace/apps/portfolio/lib/analytics/clarity.ts`
  - **Reason:** Not imported anywhere in the codebase
  - **Safe to delete:** ✅ Yes
  - **Note:** Contains tracking utility functions for Microsoft Clarity analytics (trackPaletteGeneration, trackPaletteApply, etc.) that are never used. The ClarityScript component loads the Clarity script but doesn't use these tracking functions.

### 4. Type Definitions

- **File:** `/workspace/apps/portfolio/types/index.ts`
  - **Reason:** Not imported anywhere in the codebase (types are imported directly from their source files)
  - **Safe to delete:** ⚠️ Maybe (barrel export file, not strictly necessary but harmless)

## Summary

### Critical Files to Delete (Definitely Unused)

1. **Root directory:**
   - `kabuda.md`
   - `kabuda-admin.md`
   - `kabuda-plan-completo.md`
   - `.cursor/debug.log`

2. **Entire package:**
   - `packages/core/` (entire directory and all contents)

3. **Portfolio app:**
   - `apps/portfolio/components/blog/MarkdownViewer.tsx`
   - `apps/portfolio/lib/services/blog-service-server.ts`
   - `apps/portfolio/lib/services/project-service-server.ts`
   - `apps/portfolio/lib/analytics/clarity.ts`

### Total Files/Directories to Delete: 9

### Additional Cleanup Actions:

1. Remove `@dhuezo/core` dependency from:
   - `apps/ai-landing/package.json`
   - `apps/food-dice/package.json`

2. Update `/workspace/README.md`:
   - Remove references to `packages/core` package
   - Update package description section

3. Add to `.gitignore`:
   - `.cursor/` directory or at least `.cursor/debug.log`

## Estimated Space Savings

- **Kabuda markdown files:** ~850 lines of documentation
- **packages/core:** Full package with dependencies
- **Portfolio unused files:** ~350+ lines of code
- **Debug log:** 3311 lines

## Notes

- All identified files have been verified to have no imports or references in the codebase
- The `packages/ui` package IS being used (ThemeProvider is imported by ai-landing and food-dice apps)
- Type definition files like `clarity.d.ts` and `experience.ts` are still in use, even if not explicitly imported
