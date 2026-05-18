'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { FileText, FolderKanban, LayoutGrid, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { CommandPaletteItem } from '@/types/command-palette'

export const COMMAND_PALETTE_OPEN_EVENT = 'dhuezo:command-palette-open'

function groupIcon(group: CommandPaletteItem['group']) {
  switch (group) {
    case 'nav':
      return LayoutGrid
    case 'project':
      return FolderKanban
    case 'post':
      return FileText
    default:
      return LayoutGrid
  }
}

export interface CommandPaletteProps {
  items: CommandPaletteItem[]
}

export function CommandPalette({ items }: CommandPaletteProps): JSX.Element {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const t = useTranslations('commandPalette')

  const grouped = useMemo(() => {
    const nav = items.filter((i) => i.group === 'nav')
    const projects = items.filter((i) => i.group === 'project')
    const posts = items.filter((i) => i.group === 'post')
    return { nav, projects, posts }
  }, [items])

  const navigate = useCallback(
    (href: string) => {
      setOpen(false)
      if (href.startsWith('http://') || href.startsWith('https://')) {
        window.location.assign(href)
        return
      }
      router.push(href)
    },
    [router],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onOpen = (): void => setOpen(true)
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpen)
    return () => window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpen)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'left-1/2 top-[12%] max-h-[min(75vh,520px)] max-w-lg translate-x-[-50%] translate-y-0 gap-0 overflow-hidden p-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        )}
      >
        <DialogTitle className="sr-only">{t('label')}</DialogTitle>
        <Command
          label={t('label')}
          className="flex max-h-[min(75vh,520px)] flex-col overflow-hidden bg-card text-card-foreground"
          shouldFilter
        >
          <div className="flex items-center gap-2 border-b border-border/25 px-3">
            <Search
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <Command.Input
              placeholder={t('placeholder')}
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Command.List className="max-h-[min(55vh,360px)] overflow-y-auto overscroll-contain p-2">
            <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
              {t('empty')}
            </Command.Empty>

            <Command.Group
              heading={t('group.navigate')}
              className="cmdk-group [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
            >
              {grouped.nav.map((item) => {
                const Icon = groupIcon(item.group)
                return (
                  <Command.Item
                    key={item.id}
                    value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                    keywords={item.keywords}
                    onSelect={() => navigate(item.href)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                  >
                    <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                    <span className="flex-1 truncate">{item.label}</span>
                  </Command.Item>
                )
              })}
            </Command.Group>

            {grouped.projects.length > 0 ? (
              <Command.Group
                heading={t('group.projects')}
                className="cmdk-group [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {grouped.projects.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                    keywords={item.keywords}
                    onSelect={() => navigate(item.href)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                  >
                    <FolderKanban
                      className="size-4 shrink-0 text-secondary"
                      aria-hidden
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.hint ? (
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {item.hint}
                      </span>
                    ) : null}
                  </Command.Item>
                ))}
              </Command.Group>
            ) : null}

            {grouped.posts.length > 0 ? (
              <Command.Group
                heading={t('group.posts')}
                className="cmdk-group [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {grouped.posts.map((item) => (
                  <Command.Item
                    key={item.id}
                    value={`${item.label} ${item.keywords?.join(' ') ?? ''}`}
                    keywords={item.keywords}
                    onSelect={() => navigate(item.href)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
                  >
                    <FileText
                      className="size-4 shrink-0 text-deep-rose"
                      aria-hidden
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.hint ? (
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {item.hint}
                      </span>
                    ) : null}
                  </Command.Item>
                ))}
              </Command.Group>
            ) : null}
          </Command.List>
          <div className="border-t border-border/25 px-3 py-2 text-xs text-muted-foreground">
            {t('footerHint')}
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
