import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          color: '#fafafa',
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          borderRadius: 36,
        }}
      >
        DH
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  )
}

