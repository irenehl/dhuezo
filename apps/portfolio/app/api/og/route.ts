import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const title = searchParams.get('title') || 'Daniela Huezo'
  const description = searchParams.get('description') || 'Full Stack Developer building resilient systems and dramatic interfaces.'
  const locale = searchParams.get('locale') || 'en'

  // Truncate title and description if too long
  const truncatedTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title
  const truncatedDescription = description.length > 120 ? `${description.slice(0, 117)}...` : description

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b', // zinc-950
          backgroundImage: 'linear-gradient(to bottom, #09090b 0%, #18181b 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '90%',
            maxWidth: '1000px',
            padding: '80px',
          }}
        >
          {/* Site name / Brand */}
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#f43f5e', // rose-500
              marginBottom: '40px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            REPUTATION
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#fafafa', // zinc-50
              lineHeight: '1.1',
              marginBottom: '32px',
              letterSpacing: '-0.02em',
            }}
          >
            {truncatedTitle}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#a1a1aa', // zinc-400
              lineHeight: '1.5',
              maxWidth: '900px',
            }}
          >
            {truncatedDescription}
          </div>

          {/* Footer accent */}
          <div
            style={{
              marginTop: '60px',
              width: '120px',
              height: '4px',
              backgroundColor: '#f43f5e', // rose-500
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
