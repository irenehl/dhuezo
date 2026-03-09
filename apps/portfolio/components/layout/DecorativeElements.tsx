export function DecorativeElements() {
  return (
    <>
      {/* Pressed Flower Decorations - Top Left */}
      <div
        className="fixed top-[10vh] left-[5vw] w-32 h-32 opacity-[0.08] pointer-events-none z-0 hidden lg:block"
        style={{ transform: 'rotate(-15deg)' }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse
            cx="50"
            cy="40"
            rx="12"
            ry="18"
            fill="currentColor"
            className="text-dusty-rose"
            transform="rotate(-25 50 40)"
            opacity="0.6"
          />
          <ellipse
            cx="65"
            cy="50"
            rx="12"
            ry="18"
            fill="currentColor"
            className="text-dusty-rose"
            transform="rotate(25 65 50)"
            opacity="0.6"
          />
          <ellipse
            cx="50"
            cy="60"
            rx="12"
            ry="18"
            fill="currentColor"
            className="text-soft-pink"
            transform="rotate(95 50 60)"
            opacity="0.6"
          />
          <ellipse
            cx="35"
            cy="50"
            rx="12"
            ry="18"
            fill="currentColor"
            className="text-soft-pink"
            transform="rotate(-95 35 50)"
            opacity="0.6"
          />
          <circle cx="50" cy="50" r="6" fill="currentColor" className="text-deep-rose" opacity="0.7" />
        </svg>
      </div>

      {/* Pressed Flower Decorations - Bottom Right */}
      <div
        className="fixed bottom-[15vh] right-[8vw] w-28 h-28 opacity-[0.08] pointer-events-none z-0 hidden lg:block"
        style={{ transform: 'rotate(25deg)' }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <ellipse
            cx="50"
            cy="40"
            rx="10"
            ry="15"
            fill="currentColor"
            className="text-soft-pink"
            transform="rotate(-30 50 40)"
            opacity="0.5"
          />
          <ellipse
            cx="62"
            cy="50"
            rx="10"
            ry="15"
            fill="currentColor"
            className="text-soft-pink"
            transform="rotate(30 62 50)"
            opacity="0.5"
          />
          <ellipse
            cx="50"
            cy="60"
            rx="10"
            ry="15"
            fill="currentColor"
            className="text-gentle-beige"
            transform="rotate(80 50 60)"
            opacity="0.5"
          />
          <ellipse
            cx="38"
            cy="50"
            rx="10"
            ry="15"
            fill="currentColor"
            className="text-gentle-beige"
            transform="rotate(-80 38 50)"
            opacity="0.5"
          />
          <circle cx="50" cy="50" r="4" fill="currentColor" className="text-burlap" opacity="0.6" />
        </svg>
      </div>
    </>
  )
}
