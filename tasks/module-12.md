# Module 12: Purple-Red Color Palette with Dark/Light Mode

## Overview
Transform the default color scheme from blue-based to a purple-to-red gradient theme, and enable both dark and light mode support with dark mode as default.

## Objectives
- Update default color palette to purple-red gradient (Primary: Purple, Secondary: Red, Accent: White/midpoint)
- Implement both dark and light mode support
- Set dark mode as the default theme
- Create theme toggle component for user switching
- Update workspace rules to reflect new theme support

## Technical Requirements

### 1. Color Palette Definition
- **Primary**: Purple derived from gradient (~270° hue, high saturation)
- **Secondary**: Red derived from gradient (~0° hue, high saturation)
- **Accent**: Midpoint between purple and red (~330° hue) or white for contrast
- **Light Mode**: Light backgrounds with dark text, maintaining purple-red accents
- **Dark Mode**: Dark backgrounds with light text, maintaining purple-red accents

### 2. Workspace Rules Update
- Update `.cursor/rules/guidelines-architecture.mdc`
- Change Dark Mode section to allow both dark and light modes
- Update documentation to reflect dark mode as default

### 3. Dependencies
- Install `next-themes` package for theme management

### 4. Core Components
- Update `app/globals.css` with new CSS variables for both modes
- Update `lib/context/ThemeContext.tsx` default palette
- Add `next-themes` ThemeProvider to `app/layout.tsx`
- Create `components/layout/ThemeToggle.tsx` component
- Integrate ThemeToggle into Header component

## Implementation Details

### File Structure
```
.cursor/rules/
  guidelines-architecture.mdc    (modified)
package.json                     (modified)
app/
  globals.css                    (modified)
  layout.tsx                     (modified)
lib/context/
  ThemeContext.tsx               (modified)
components/layout/
  ThemeToggle.tsx                (new)
  Header.tsx                     (modified)
```

### Step 1: Update Workspace Rules
**File**: `.cursor/rules/guidelines-architecture.mdc`
- Line 15: Change from "no light mode should be generated" to support both modes
- Line 68: Update to reflect both modes supported, dark as default

### Step 2: Install next-themes
**File**: `package.json`
- Add `next-themes` to dependencies

### Step 3: Update Global CSS
**File**: `app/globals.css`
- Replace `:root` CSS variables with light mode purple-red colors:
  - Primary: Purple HSL (~270°)
  - Secondary: Red HSL (~0°)
  - Accent: Midpoint pink/magenta HSL (~330°)
  - Background: Light
  - Text: Dark
  - Muted/Border: Light gray variants
- Replace `.dark` CSS variables with dark mode variants:
  - Same primary/secondary/accent colors
  - Background: Dark
  - Text: Light
  - Muted/Border: Dark gray variants

### Step 4: Update ThemeContext
**File**: `lib/context/ThemeContext.tsx`
- Update `defaultPalette` colors:
  - Primary: Purple hex value
  - Secondary: Red hex value
  - Accent: Midpoint pink/magenta hex value
  - Background: Dark hex value (for dark mode default)
  - Text: Light hex value
  - Muted/Border: Dark variants

### Step 5: Add Theme Provider
**File**: `app/layout.tsx`
- Import `ThemeProvider` from `next-themes`
- Wrap children with ThemeProvider
- Set `defaultTheme="dark"` and `attribute="class"`
- Ensure compatibility with existing ThemeProvider

### Step 6: Create Theme Toggle Component
**File**: `components/layout/ThemeToggle.tsx` (new)
- Client component using `next-themes` `useTheme` hook
- Use shadcn/ui Button component
- Sun/Moon icons from lucide-react
- Accessibility labels
- Smooth transitions

### Step 7: Integrate Theme Toggle
**File**: `components/layout/Header.tsx`
- Import and add ThemeToggle component
- Place in desktop navigation area
- Ensure mobile menu compatibility

## Color Values

### Light Mode
- Primary: `#9333EA` (Purple)
- Secondary: `#DC2626` (Red)
- Accent: `#EC4899` (Pink/Magenta midpoint)
- Background: `#FFFFFF` or off-white
- Text: `#0F172A` (Dark)
- Muted: Light gray
- Border: Light gray

### Dark Mode
- Primary: `#9333EA` (Purple)
- Secondary: `#DC2626` (Red)
- Accent: `#EC4899` (Pink/Magenta midpoint)
- Background: `#0B1220` (Dark)
- Text: `#E5E7EB` (Light)
- Muted: Dark gray
- Border: Dark gray

## Testing Checklist
- [ ] Dark mode is default on page load
- [ ] Theme switching works between dark and light modes
- [ ] Color contrast meets accessibility standards (WCAG AA minimum)
- [ ] Custom palette system still works with new defaults
- [ ] All UI components render correctly in both modes
- [ ] Theme toggle is accessible and functional
- [ ] Theme preference persists across page reloads
- [ ] Header integration works on desktop and mobile

## Notes
- Ensure HSL color values are properly formatted for CSS variables
- Maintain compatibility with existing custom palette functionality
- Follow shadcn/ui theming conventions
- Use Tailwind's `dark:` variant appropriately
- Remove any console.log statements from production code

