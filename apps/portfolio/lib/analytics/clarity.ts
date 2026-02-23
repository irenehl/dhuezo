const isClarityAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.clarity === 'function'
}

export function trackPaletteGeneration(prompt: string, success: boolean): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity?.('event', 'palette_generated')
    window.clarity?.('set', 'palette_prompt', prompt)
    window.clarity?.('set', 'generation_success', success.toString())
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

export function trackPaletteApply(
  paletteId: string,
  source: 'carousel' | 'preview' | 'dropdown'
): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity?.('event', 'palette_applied')
    window.clarity?.('set', 'palette_id', paletteId)
    window.clarity?.('set', 'apply_source', source)
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

export function trackPaletteReset(): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity?.('event', 'palette_reset')
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

export function trackPromptExample(prompt: string): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity?.('event', 'prompt_example_clicked')
    window.clarity?.('set', 'example_prompt', prompt)
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

export function trackCarouselNavigation(direction: 'next' | 'prev'): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity?.('event', 'carousel_navigation')
    window.clarity?.('set', 'navigation_direction', direction)
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

export function trackHistoryDropdownToggle(isOpen: boolean): void {
  if (!isClarityAvailable()) return

  try {
    window.clarity?.('event', 'history_dropdown_toggled')
    window.clarity?.('set', 'dropdown_state', isOpen ? 'opened' : 'closed')
  } catch (error) {
    console.warn('Clarity tracking error:', error)
  }
}

