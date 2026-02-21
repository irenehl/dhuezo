'use client'

import { useTranslations } from 'next-intl'

interface Skill {
  name: string
  icon: string // Simple Icons slug
}

export function SkillsSection() {
  const t = useTranslations()

  const skillCategories = [
    {
      title: t('skills.frontend.title', { default: 'Frontend Development' }),
      skills: [
        { name: 'React', icon: 'react' },
        { name: 'Next.js', icon: 'nextdotjs' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Tailwind CSS', icon: 'tailwindcss' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'HTML5', icon: 'html5' },
        { name: 'CSS3', icon: 'css3' },
        { name: 'Framer Motion', icon: 'framer' },
      ],
    },
    {
      title: t('skills.backend.title', { default: 'Backend & Databases' }),
      skills: [
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'Express', icon: 'express' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'Prisma', icon: 'prisma' },
        { name: 'GraphQL', icon: 'graphql' },
        { name: 'Supabase', icon: 'supabase' },
      ],
    },
    {
      title: t('skills.tools.title', { default: 'Tools & Design' }),
      skills: [
        { name: 'Git', icon: 'git' },
        { name: 'GitHub', icon: 'github' },
        { name: 'VS Code', icon: 'visualstudiocode' },
        { name: 'Figma', icon: 'figma' },
        { name: 'Photoshop', icon: 'adobephotoshop' },
        { name: 'Illustrator', icon: 'adobeillustrator' },
        { name: 'Docker', icon: 'docker' },
        { name: 'Vercel', icon: 'vercel' },
      ],
    },
  ]

  return (
    <section id="skills" className="py-24 bg-background scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-accent text-xl md:text-2xl text-primary mb-2">
            {t('skills.subtitle', { default: 'Technical Expertise' })}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground">
            {t('skills.title', { default: 'Skills' })}
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-card p-8 rounded-3xl border-2 border-border"
            >
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-8">
                {category.title}
              </h3>

              <div className="grid grid-cols-4 gap-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex flex-col items-center gap-2 transition-transform hover:-translate-y-1"
                  >
                    {/* Icon Container */}
                    <div className="w-16 h-16 p-3 bg-background border-2 border-border rounded-2xl flex items-center justify-center transition-all group-hover:border-primary">
                      <img
                        src={`https://cdn.simpleicons.org/${skill.icon}`}
                        alt={skill.name}
                        className="w-full h-full object-contain transition-all"
                        style={{
                          filter: 'sepia(0.3) hue-rotate(-10deg) saturate(0.8)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = 'sepia(0) hue-rotate(0deg) saturate(1)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'sepia(0.3) hue-rotate(-10deg) saturate(0.8)'
                        }}
                      />
                    </div>

                    {/* Skill Name */}
                    <span className="text-xs text-center text-muted-foreground font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
