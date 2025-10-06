/**
 * Contrast Calculation Utilities
 * WCAG 2.1 Level AA compliant contrast ratio calculations
 */

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 formula
 */
export function calculateLuminance(hex: string): number {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0

  const rsRGB = rgb.r / 255
  const gsRGB = rgb.g / 255
  const bsRGB = rgb.b / 255

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio from 1 to 21
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const lum1 = calculateLuminance(color1)
  const lum2 = calculateLuminance(color2)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Get the best contrasting color (black or white) for a given background
 * Returns #000000 or #ffffff
 */
export function getContrastColor(backgroundColor: string): string {
  const whiteContrast = calculateContrastRatio(backgroundColor, '#ffffff')
  const blackContrast = calculateContrastRatio(backgroundColor, '#000000')

  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * @param ratio - Contrast ratio
 * @param level - 'AA' or 'AAA'
 * @param textSize - 'normal' or 'large' (large text: 18pt+ or 14pt+ bold)
 */
export function meetsWCAGStandards(
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  textSize: 'normal' | 'large' = 'normal'
): boolean {
  if (level === 'AAA') {
    return textSize === 'large' ? ratio >= 4.5 : ratio >= 7
  }
  // Level AA
  return textSize === 'large' ? ratio >= 3 : ratio >= 4.5
}

/**
 * Adjust text color for proper contrast with background
 * If current text color has poor contrast, return black or white
 */
export function adjustTextColorForContrast(
  backgroundColor: string,
  textColor: string,
  minRatio: number = 4.5
): string {
  const currentRatio = calculateContrastRatio(backgroundColor, textColor)

  if (currentRatio >= minRatio) {
    return textColor
  }

  return getContrastColor(backgroundColor)
}

/**
 * Get contrast level description
 */
export function getContrastLevel(ratio: number): {
  level: 'Poor' | 'Good' | 'Excellent'
  description: string
} {
  if (ratio >= 7) {
    return { level: 'Excellent', description: 'WCAG AAA compliant' }
  } else if (ratio >= 4.5) {
    return { level: 'Good', description: 'WCAG AA compliant' }
  } else {
    return { level: 'Poor', description: 'Does not meet WCAG standards' }
  }
}
