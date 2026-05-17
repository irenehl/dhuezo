import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'

import { locales, defaultLocale } from './i18n/config'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request)
  const firstSegment = request.nextUrl.pathname.split('/').filter(Boolean)[0]
  const locale = locales.includes(firstSegment as (typeof locales)[number])
    ? firstSegment
    : defaultLocale
  response.headers.set('x-site-locale', locale)
  return response
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}

