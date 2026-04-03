'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { AnimatedSection, StaggerContainer, staggerItemVariants } from '@/components/ui/AnimatedSection'
import { SectionChapter } from '@/components/ui/SectionChapter'

interface Skill {
  name: string
  icon: string
  isLocal?: boolean
}

export function SkillsSection() {
  const t = useTranslations()

  const skillCategories = [
    {
      title: t('skills.frontend.title', { default: 'Frontend Development' }),
      gradient: 'from-dusty-rose to-soft-pink',
      skills: [
        { name: 'React', icon: 'react' },
        { name: 'Next.js', icon: 'nextdotjs' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'Tailwind CSS', icon: 'tailwindcss' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'Expo', icon: 'expo' }
      ],
    },
    {
      title: t('skills.backend.title', { default: 'Backend & Databases' }),
      gradient: 'from-sage-blue to-burlap',
      skills: [
        { name: 'Node.js', icon: 'nodedotjs' },
        { name: 'NestJS', icon: 'nestjs' },
        { name: 'Express', icon: 'express' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'PostgreSQL', icon: 'postgresql' },
        { name: 'Prisma', icon: 'prisma' },
        { name: 'Convex', icon: '/convex.webp', isLocal: true },
        { name: 'Supabase', icon: 'supabase' }
      ],
    },
    {
      title: t('skills.tools.title', { default: 'Tools & Design' }),
      gradient: 'from-gentle-beige to-deep-rose',
      skills: [
        { name: 'Git', icon: 'git' },
        { name: 'GitHub', icon: 'github' },
        { name: 'Cursor', icon: 'cursor' },
        { name: 'Figma', icon: 'figma' },
        { name: 'Vercel', icon: 'vercel' },
        { name: 'Claude Code', icon: 'claude' },
        { name: 'Docker', icon: 'docker' }
      ],
    },
  ]

  return (
    <section
      id="skills"
      className="relative scroll-mt-header overflow-hidden border-t border-border/50 bg-background py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_85%_15%,hsl(var(--primary)/0.1),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.006] md:opacity-[0.014]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-16">
        <AnimatedSection>
          <SectionChapter
            variant="immersive"
            sceneIndex="03"
            label={t('sections.chapter.skills')}
            title={t('skills.title', { default: 'Skills' })}
            description={t('skills.description', {
              default: 'Languages, frameworks, and tools I use to ship reliable products.',
            })}
          />
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.1}>
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerItemVariants}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/75 shadow-[0_12px_40px_-20px_hsl(var(--pressed-brown)/0.12)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_18px_48px_-22px_hsl(var(--pressed-brown)/0.16)] dark:bg-card/60"
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${category.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity rounded-bl-full`} />

              <div className="p-8 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${category.gradient}`} />
                  <h3 className="font-display text-xl md:text-2xl text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="group/skill flex flex-col items-center gap-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.05, duration: 0.3 }}
                    >
                      <motion.div
                        className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-background/90 p-2.5 transition-all group-hover/skill:border-primary/60 group-hover/skill:bg-card/50 group-hover/skill:shadow-lg sm:h-16 sm:w-16 sm:p-3"
                        whileHover={{ scale: 1.1, y: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src={
                              skill.isLocal
                                ? skill.icon
                                : `https://cdn.simpleicons.org/${skill.icon}`
                            }
                            alt={skill.name}
                            width={64}
                            height={64}
                            unoptimized={!skill.isLocal}
                            className="h-full w-full object-contain transition-all"
                            style={{
                              filter:
                                skill.name === 'Convex'
                                  ? 'none'
                                  : skill.isLocal
                                    ? 'sepia(0.3) hue-rotate(180deg) saturate(0.6) brightness(0.95) contrast(1.1)'
                                    : 'sepia(0.4) hue-rotate(15deg) saturate(0.5) brightness(0.9) contrast(1.1)',
                            }}
                            onMouseEnter={(e) => {
                              if (skill.name === 'Convex') {
                                e.currentTarget.style.filter = 'brightness(1.05)'
                              } else {
                                e.currentTarget.style.filter = skill.isLocal
                                  ? 'sepia(0.2) hue-rotate(180deg) saturate(0.8) brightness(1.05) contrast(1.1)'
                                  : 'sepia(0.2) hue-rotate(15deg) saturate(0.7) brightness(1) contrast(1.1)'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (skill.name === 'Convex') {
                                e.currentTarget.style.filter = 'none'
                              } else {
                                e.currentTarget.style.filter = skill.isLocal
                                  ? 'sepia(0.3) hue-rotate(180deg) saturate(0.6) brightness(0.95) contrast(1.1)'
                                  : 'sepia(0.4) hue-rotate(15deg) saturate(0.5) brightness(0.9) contrast(1.1)'
                              }
                            }}
                          />
                          {skill.name !== 'Convex' && (
                            <div 
                              className="absolute inset-0 rounded-lg mix-blend-soft-light opacity-20 pointer-events-none group-hover/skill:opacity-30 transition-opacity"
                              style={{
                                background: 'linear-gradient(135deg, hsl(var(--dusty-rose)) 0%, hsl(var(--sage-blue)) 100%)',
                              }}
                            />
                          )}
                          
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/skill:opacity-100"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </motion.div>

                      <span className="text-xs text-center text-muted-foreground font-medium transition-colors group-hover/skill:text-foreground">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
