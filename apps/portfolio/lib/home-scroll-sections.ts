export const HOME_SCROLL_SECTION_IDS = [
  'intro',
  'projects',
  'skills',
  'experience',
  'stage',
  'spec',
  'about',
] as const

export type HomeScrollSectionId = (typeof HOME_SCROLL_SECTION_IDS)[number]
