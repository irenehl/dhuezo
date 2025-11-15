'use client'

import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { FooterBranding } from './footer/FooterBranding'
import { FooterNavigation } from './footer/FooterNavigation'
import { FooterContact } from './footer/FooterContact'
import { FooterCTA } from './footer/FooterCTA'
import { SocialLinks } from './footer/SocialLinks'
import { Copyright } from './footer/Copyright'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FooterBranding />
          {/* <FooterNavigation /> */}
          <FooterContact />
          <FooterCTA />
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Copyright />
          <SocialLinks />
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"
      />
    </footer>
  )
}
