export const siteConfig = {
  name: 'Nameless',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
  defaultTitle: 'Nameless - Find Your Calm',
  defaultDescription:
    'Interactive mindfulness activities designed to help you settle your mind. No pressure. No streaks. Just a quiet space to breathe.',
  twitterHandle: undefined, // No Twitter handle for this app
  defaultOgImage: '/og-image.png',
  icon: '/icon.png', // Update this path when icon is added to /public
  keywords: [
    'mindfulness',
    'meditation',
    'anxiety relief',
    'grounding techniques',
    'calm',
    'wellness',
    'mental health',
  ],
}
