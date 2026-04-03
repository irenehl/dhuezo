'use client'

import { useEffect } from 'react'

/**
 * Konami + console messages — development only (not bundled into behavior in prod layout).
 */
export function DecorativeDevConsole(): null {
  useEffect(() => {
    let konamiCode: string[] = []
    const konamiSequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ]

    const handleKonamiCode = (e: KeyboardEvent): void => {
      konamiCode.push(e.key)
      konamiCode = konamiCode.slice(-10)

      if (konamiCode.join(',') === konamiSequence.join(',')) {
        alert(
          'Achievement Unlocked! 🎮 You found the secret code. My island in Animal Crossing is called Serenity. Want to trade friend codes?',
        )
        konamiCode = []
      }
    }

    const spawnPokemon = (): void => {
      const pokemon = [
        'Pikachu',
        'Eevee',
        'Snorlax',
        'Jigglypuff',
        'Ditto',
        'Bulbasaur',
        'Squirtle',
        'Charmander',
      ]
      const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)]
      console.log(
        `%c🌟 A wild ${randomPokemon} appeared in the console! 🌟`,
        'color: #D4A5C4; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);',
      )
    }

    const pokemonInterval = setInterval(spawnPokemon, 30000)

    console.log(
      '%c👋 Hey there, fellow developer!',
      'color: #7B9B9E; font-size: 20px; font-weight: bold;',
    )
    console.log(
      '%c✨ Thanks for checking out my portfolio! Feel free to explore the code.',
      'color: #8B7355; font-size: 14px;',
    )
    console.log(
      '%c💡 Psst... try the Konami Code for a surprise!',
      'color: #D4A5C4; font-size: 12px; font-style: italic;',
    )

    document.addEventListener('keydown', handleKonamiCode)

    return () => {
      document.removeEventListener('keydown', handleKonamiCode)
      clearInterval(pokemonInterval)
    }
  }, [])

  return null
}
