# Module 11: Microsoft Clarity Analytics Integration

## Overview
Integrate Microsoft Clarity analytics into the color-palette page and its components to track user interactions, palette generation patterns, and user behavior. This module focuses on comprehensive event tracking for analytics and UX insights.

## Objectives
- Integrate Microsoft Clarity tracking script (production only)
- Track all user interactions on color-palette page
- Implement custom events for detailed analytics
- Create type-safe tracking utilities
- Maintain privacy and performance best practices

## Technical Requirements

### 1. Environment Setup
- Clarity Project ID: `tlp4xbrfa3`
- Production-only tracking (NODE_ENV check)
- Environment variable configuration
- TypeScript type declarations

### 2. Core Components
- ClarityScript component (client-side)
- Tracking utility functions
- TypeScript declarations
- Event tracking integration

### 3. Tracked Events
1. **Palette Generation** - Track when users generate palettes
2. **Palette Application** - Track palette applies from carousel/preview
3. **Palette Reset** - Track clean/reset button usage
4. **Prompt Examples** - Track which example prompts are clicked
5. **Carousel Navigation** - Track next/previous navigation
6. **History Dropdown** - Track dropdown open/close and selections

## Implementation Details

### File Structure
```
components/
  analytics/
    ClarityScript.tsx       (new)
lib/
  analytics/
    clarity.ts              (new)
types/
  clarity.d.ts              (new)
app/
  layout.tsx                (modified)
components/
  color-palette/
    ColorPaletteInput.tsx   (modified)
    PaletteCarousel.tsx     (modified)
    PromptExamples.tsx      (modified)
    PaletteHistoryDropdown.tsx (modified)
env.example                 (modified)
```

### 1. Clarity Script Component

**File:** `/components/analytics/ClarityScript.tsx`

```typescript
'use client'

import Script from 'next/script'

export function ClarityScript() {
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'tlp4xbrfa3'

  return (
    <Script
      id="clarity-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityProjectId}");
        `,
      }}
    />
  )
}
```

### 2. Tracking Utilities

**File:** `/lib/analytics/clarity.ts`

```typescript
/**
 * Microsoft Clarity Analytics Utilities
 * Type-safe functions for tracking custom events
 */

// Check if Clarity is loaded
const isClarityAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.clarity === 'function'
}

/**
 * Track palette generation event
 * @param prompt - The user's input prompt
 * @param success - Whether generation was successful
 */
export function trackPaletteGeneration(prompt: string, success: boolean): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity('event', 'palette_generated')
    window.clarity('set', 'palette_prompt', prompt)
    window.clarity('set', 'generation_success', success.toString())
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

/**
 * Track palette application
 * @param paletteId - The ID of the applied palette
 * @param source - Where the palette was applied from
 */
export function trackPaletteApply(
  paletteId: string,
  source: 'carousel' | 'preview' | 'dropdown'
): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity('event', 'palette_applied')
    window.clarity('set', 'palette_id', paletteId)
    window.clarity('set', 'apply_source', source)
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

/**
 * Track palette reset/clean action
 */
export function trackPaletteReset(): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity('event', 'palette_reset')
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

/**
 * Track prompt example click
 * @param prompt - The example prompt text
 */
export function trackPromptExample(prompt: string): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity('event', 'prompt_example_clicked')
    window.clarity('set', 'example_prompt', prompt)
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

/**
 * Track carousel navigation
 * @param direction - Navigation direction
 */
export function trackCarouselNavigation(direction: 'next' | 'prev'): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity('event', 'carousel_navigation')
    window.clarity('set', 'navigation_direction', direction)
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

/**
 * Track history dropdown toggle
 * @param isOpen - Whether dropdown is being opened or closed
 */
export function trackHistoryDropdownToggle(isOpen: boolean): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity('event', 'history_dropdown_toggled')
    window.clarity('set', 'dropdown_state', isOpen ? 'opened' : 'closed')
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}
```

### 3. TypeScript Declarations

**File:** `/types/clarity.d.ts`

```typescript
/**
 * Microsoft Clarity API Type Declarations
 */

interface Window {
  clarity?: {
    (method: 'event', eventName: string): void
    (method: 'set', key: string, value: string): void
    (method: 'identify', userId: string, sessionId?: string, pageId?: string, friendlyName?: string): void
    (method: 'upgrade', reason: string): void
    q?: Array<unknown>
  }
}
```

### 4. Integration Points

#### Root Layout
**File:** `/app/layout.tsx`

Add after the existing imports:
```typescript
import { ClarityScript } from '@/components/analytics/ClarityScript'
```

Inside the `<body>` tag, after `<Toaster />`:
```typescript
<ClarityScript />
```

#### Color Palette Input
**File:** `/components/color-palette/ColorPaletteInput.tsx`

Add imports:
```typescript
import { trackPaletteGeneration, trackPaletteReset } from '@/lib/analytics/clarity'
```

In `handleGenerate` function, after successful generation:
```typescript
trackPaletteGeneration(prompt, true)
```

In error catch block:
```typescript
trackPaletteGeneration(prompt, false)
```

For clean button (in the button's onClick):
```typescript
onClick={() => {
  trackPaletteReset()
  resetPalette()
}}
```

#### Palette Carousel
**File:** `/components/color-palette/PaletteCarousel.tsx`

Add imports:
```typescript
import { trackPaletteApply, trackCarouselNavigation } from '@/lib/analytics/clarity'
```

In `handleApply` function:
```typescript
trackPaletteApply(palette.id, 'carousel')
```

In previous button handler:
```typescript
onClick={() => {
  trackCarouselNavigation('prev')
  // existing prev logic
}}
```

In next button handler:
```typescript
onClick={() => {
  trackCarouselNavigation('next')
  // existing next logic
}}
```

#### Prompt Examples
**File:** `/components/color-palette/PromptExamples.tsx`

Add import:
```typescript
import { trackPromptExample } from '@/lib/analytics/clarity'
```

In example button click handler:
```typescript
onClick={() => {
  trackPromptExample(prompt)
  onExampleClick(prompt)
}}
```

#### History Dropdown
**File:** `/components/color-palette/PaletteHistoryDropdown.tsx`

Add imports:
```typescript
import { trackHistoryDropdownToggle, trackPaletteApply } from '@/lib/analytics/clarity'
```

When dropdown opens/closes:
```typescript
setIsOpen((prev) => {
  const newState = !prev
  trackHistoryDropdownToggle(newState)
  return newState
})
```

When palette is applied from dropdown:
```typescript
trackPaletteApply(palette.id, 'dropdown')
```

### 5. Environment Configuration

**File:** `/env.example`

Add at the end:
```
# Microsoft Clarity Analytics
NEXT_PUBLIC_CLARITY_PROJECT_ID=tlp4xbrfa3
```

## Custom Events Tracked

| Event Name | Description | Metadata |
|------------|-------------|----------|
| `palette_generated` | User generates a color palette | prompt, success |
| `palette_applied` | User applies a palette | palette_id, source |
| `palette_reset` | User resets to default palette | - |
| `prompt_example_clicked` | User clicks an example prompt | example_prompt |
| `carousel_navigation` | User navigates carousel | direction |
| `history_dropdown_toggled` | User opens/closes history | dropdown_state |

## Privacy & Performance Considerations

1. **Production Only**: Script only loads when `NODE_ENV === 'production'`
2. **Error Handling**: All tracking wrapped in try-catch blocks
3. **Null Checks**: Verify Clarity is loaded before tracking
4. **Non-blocking**: Script loads with `afterInteractive` strategy
5. **No PII**: Only track interaction patterns, not user data

## Testing Guidelines

### Development Testing
1. Verify script doesn't load in development (check browser DevTools)
2. Verify tracking functions don't throw errors when Clarity unavailable
3. Check console for any tracking warnings

### Production Testing
1. Deploy to production environment
2. Open browser DevTools > Network tab
3. Verify Clarity script loads from `clarity.ms`
4. Perform interactions and verify events in Clarity dashboard
5. Check Clarity dashboard for custom events within 30 minutes

### Test Scenarios
- [ ] Generate palette with valid prompt
- [ ] Generate palette that fails
- [ ] Click prompt examples
- [ ] Navigate carousel (previous/next)
- [ ] Apply palette from carousel
- [ ] Open/close history dropdown
- [ ] Apply palette from dropdown
- [ ] Click clean/reset button

## Analytics Insights to Monitor

1. **Most Popular Prompts**: Track which prompts users generate most
2. **Success Rate**: Monitor palette generation success vs failures
3. **User Flow**: See if users prefer examples vs custom prompts
4. **Carousel Engagement**: Track navigation patterns and apply rates
5. **History Usage**: Monitor dropdown usage and reapplication patterns
6. **Reset Frequency**: Understand how often users reset palettes

## Future Enhancements

1. **User Identification**: Track authenticated vs anonymous users
2. **Session Tracking**: Link palette generations within sessions
3. **A/B Testing**: Test different prompt examples
4. **Error Tracking**: Detailed error event tracking
5. **Performance Metrics**: Track palette generation timing
6. **Heatmaps**: Use Clarity's heatmap feature for visual insights

## Rollback Plan

If issues arise after deployment:

1. **Immediate Fix**: Set `NEXT_PUBLIC_CLARITY_PROJECT_ID` to empty string
2. **Code Rollback**: Remove `<ClarityScript />` from layout
3. **Selective Disable**: Comment out specific tracking calls
4. **Monitor**: Check Clarity dashboard and application logs

## Success Criteria

- [x] Clarity script loads only in production
- [x] All 6 custom events are tracked
- [x] No console errors in development or production
- [x] TypeScript compilation succeeds
- [x] No performance impact on page load
- [x] Events appear in Clarity dashboard within 30 minutes
- [x] Privacy requirements met (no PII tracked)

## Resources

- [Microsoft Clarity Documentation](https://learn.microsoft.com/en-us/clarity/)
- [Clarity JavaScript API](https://learn.microsoft.com/en-us/clarity/clarity-api)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)

## Notes

- Clarity has a delay of up to 2 hours for data to appear in dashboard
- Custom events may take 30 minutes to appear
- Heatmaps and recordings are automatically enabled
- Free tier includes unlimited sessions and recordings
- Data retention: 90 days on free tier

