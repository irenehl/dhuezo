import { getTranslations } from 'next-intl/server'
import { SectionChapter } from '@/components/ui/SectionChapter'

export async function SpecTeaserSection(): Promise<JSX.Element> {
  const t = await getTranslations('spec')

  return (
    <section
      id="spec"
      className="relative scroll-mt-header overflow-hidden border-y border-border/50 bg-muted/20 py-24 dark:bg-muted/10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(var(--dusty-rose)/0.08),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.014]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <SectionChapter
          variant="immersive"
          sceneIndex="06"
          label={t('chapter')}
          title={t('title')}
          description={t('abstract')}
          className="mb-10"
        />

        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-foreground/90 md:text-base">
          {t('gravitas')}
        </p>

        <p className="mb-2 text-xs text-muted-foreground md:hidden">
          {t('tableScrollHint')}
        </p>

        <div
          className="overflow-x-auto overscroll-x-contain rounded-2xl border border-border/60 bg-card/75 shadow-[0_12px_40px_-20px_hsl(var(--pressed-brown)/0.1)] backdrop-blur-sm dark:bg-card/50"
          role="region"
          aria-labelledby="spec-table-caption"
        >
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <caption
              id="spec-table-caption"
              className="border-b border-border px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {t('tableCaption')}
            </caption>
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                  {t('colTier')}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                  {t('colShip')}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                  {t('colShipPlus')}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-foreground">
                  {t('colShipMax')}
                </th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/80">
                <th scope="row" className="px-4 py-3 font-medium text-foreground">
                  {t('rowCoffee')}
                </th>
                <td className="px-4 py-3">{t('cellCoffee1')}</td>
                <td className="px-4 py-3">{t('cellCoffee2')}</td>
                <td className="px-4 py-3">{t('cellCoffee3')}</td>
              </tr>
              <tr className="border-b border-border/80">
                <th scope="row" className="px-4 py-3 font-medium text-foreground">
                  {t('rowTests')}
                </th>
                <td className="px-4 py-3">{t('cellTests1')}</td>
                <td className="px-4 py-3">{t('cellTests2')}</td>
                <td className="px-4 py-3">{t('cellTests3')}</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-foreground">
                  {t('rowVibe')}
                </th>
                <td className="px-4 py-3">{t('cellVibe1')}</td>
                <td className="px-4 py-3">{t('cellVibe2')}</td>
                <td className="px-4 py-3">{t('cellVibe3')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">{t('footnote')}</p>
      </div>
    </section>
  )
}
