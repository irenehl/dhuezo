'use client'

import { useEffect } from 'react'

export function DecorativeElements() {
  useEffect(() => {
    // Konami Code Easter Egg
    let konamiCode: string[] = []
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

    const handleKonamiCode = (e: KeyboardEvent) => {
      konamiCode.push(e.key)
      konamiCode = konamiCode.slice(-10)

      if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert('Achievement Unlocked! 🎮 You found the secret code. My island in Animal Crossing is called Serenity. Want to trade friend codes?')
        konamiCode = []
      }
    }

    // Random Pokemon Encounter in Console
    const spawnPokemon = () => {
      const pokemon = ['Pikachu', 'Eevee', 'Snorlax', 'Jigglypuff', 'Ditto', 'Bulbasaur', 'Squirtle', 'Charmander']
      const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)]
      console.log(
        `%c🌟 A wild ${randomPokemon} appeared in the console! 🌟`,
        'color: #D4A5C4; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
      )
    }

    // Spawn Pokemon every 30 seconds
    const pokemonInterval = setInterval(spawnPokemon, 30000)

    // Welcome message in console
    console.log(
      '%c👋 Hey there, fellow developer!',
      'color: #7B9B9E; font-size: 20px; font-weight: bold;'
    )
    console.log(
      '%c✨ Thanks for checking out my portfolio! Feel free to explore the code.',
      'color: #8B7355; font-size: 14px;'
    )
    console.log(
      '%c💡 Psst... try the Konami Code for a surprise!',
      'color: #D4A5C4; font-size: 12px; font-style: italic;'
    )

    document.addEventListener('keydown', handleKonamiCode)

    return () => {
      document.removeEventListener('keydown', handleKonamiCode)
      clearInterval(pokemonInterval)
    }
  }, [])

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
