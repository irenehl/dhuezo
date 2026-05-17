export type CommandPaletteItemGroup = 'nav' | 'project' | 'post'

export interface CommandPaletteItem {
  id: string
  group: CommandPaletteItemGroup
  label: string
  hint?: string
  href: string
  keywords?: string[]
}
