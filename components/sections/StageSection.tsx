import { StageSectionClient } from './StageSectionClient'

interface StageEntry {
  id: string
  date: string
  type: 'talk' | 'article' | 'slide'
  eventLocation?: string
  title: string
  description: string
  ctaLabel: string
  ctaUrl?: string
}

export async function StageSection() {
  // TODO: Re-implement with new data source after Appwrite removal
  const stageEntries: StageEntry[] = []

  return <StageSectionClient entries={stageEntries} />
}

