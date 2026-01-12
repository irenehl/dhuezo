import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { PostBody } from '@/components/blog/PostBody'
import { Footer } from '@/components/layout/Footer'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { siteConfig } from '@/lib/config'
import { generateMetadata as generateSiteMetadata } from '@/lib/metadata'
import { projectContentService } from '@/lib/services/project-content-service'

type Props = {
  params: Promise<{ projectId: string; locale: string }>
}

export async function generateStaticParams() {
  const projectsEn = await projectContentService.getAllProjects('en')
  const projectsEs = await projectContentService.getAllProjects('es')
  
  return [
    ...projectsEn.map((project) => ({
      projectId: project.project_id,
      locale: 'en',
    })),
    ...projectsEs.map((project) => ({
      projectId: project.project_id,
      locale: 'es',
    })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId, locale } = await params
  const project = await projectContentService.getProjectById(projectId, locale as 'en' | 'es')

  if (!project) {
    return generateSiteMetadata({
      locale,
      title: `Project Not Found | ${siteConfig.name}`,
    })
  }

  const projectUrl = `${siteConfig.url}/${locale}/projects/${projectId}`
  const description = project.description || `View ${project.title} project`
  
  // Generate OG image using the API instead of static preview image
  // The OG image API will generate a dynamic image based on project title and description
  const ogImageUrl = `/api/og?${new URLSearchParams({
    title: project.title,
    description: project.description,
    locale: locale,
  }).toString()}`

  return generateSiteMetadata({
    locale,
    title: project.title,
    description,
    url: projectUrl,
    type: 'website',
    image: ogImageUrl, // Use dynamic OG image instead of static preview image
  })
}

export default async function ProjectPage({ params }: Props) {
  const { projectId, locale } = await params
  const localeValue = locale as 'en' | 'es'
  const t = await getTranslations('projects')
  const project = await projectContentService.getProjectById(projectId, localeValue)

  if (!project) {
    notFound()
  }

  const projectUrl = `${siteConfig.url}/${locale}/projects/${projectId}`

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-12 w-full">
        <article className="space-y-10 animate-in fade-in-50 duration-500" id="project-post">
          <header className="space-y-4">
            <div className="flex items-center justify-between">
              <Link
                className="inline-block font-mono text-accent text-xs transition-colors hover:text-accent/80"
                href={`/${locale}#projects`}
              >
                ← {t('title')}
              </Link>
            </div>
            <h1 className="font-display font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              {project.tags && project.tags.length > 0 && (
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span
                      className="font-mono text-accent/70 text-xs"
                      key={tag}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            {(project.deployed_url || project.repo_url) && (
              <div className="flex gap-4 pt-4">
                {project.deployed_url && (
                  <a
                    href={project.deployed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    View Live Site →
                  </a>
                )}
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                  >
                    View Repository →
                  </a>
                )}
              </div>
            )}
          </header>

          <PostBody
            contentHtml={project.contentHtml}
            className="animate-in fade-in-50 duration-500"
          />

          <footer className="border-border/60 border-t pt-8">
            <Link
              className="inline-block font-mono text-accent text-xs transition-colors hover:text-accent/80"
              href={`/${locale}#projects`}
            >
              ← Back to Projects
            </Link>
          </footer>
        </article>
      </main>
      <Footer />

      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            url: projectUrl,
            ...(project.deployed_url && { url: project.deployed_url }),
            ...(project.repo_url && { codeRepository: project.repo_url }),
            creator: {
              '@type': 'Person',
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
        type="application/ld+json"
      />
    </div>
  )
}
