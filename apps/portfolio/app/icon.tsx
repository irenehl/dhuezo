import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
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
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          borderRadius: 6,
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

