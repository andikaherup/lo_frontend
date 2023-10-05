export const getBackground = (hero: string) => {

  switch (hero) {
    case 'Hero':
      return 'bg-gradient-to-r from-darkHero from-10% via-darkHero via-10% to-lightHero'

    case 'Magician':
      return 'bg-gradient-to-r from-darkMagician from-10% via-darkMagician via-10% to-lightMagician'

    case 'Rebel':
      return 'bg-gradient-to-r from-darkRebel from-10% via-darkRebel via-10% to-lightRebel'

    case 'Creator':
      return 'bg-gradient-to-r from-darkCreator from-10% via-darkCreator via-10% to-lightCreator'

    case 'Synergist':
      return 'bg-gradient-to-r from-darkGreen from-10% via-darkGreen via-10% to-lightGreen'

    case 'Oracle':
      return 'bg-gradient-to-r from-darkOracle from-10% via-darkOracle via-10% to-lightOracle'

    case 'Protector':
      return 'bg-gradient-to-r from-darkProtector from-10% via-darkProtector via-10% to-lightProtector'

    case 'Ruler':
      return 'bg-gradient-to-r from-darkBlue from-10% via-darkBlue via-10% to-lightBlue'
  }

}

export const gettestimonialRingCOlor = (character: string) => {
  switch (character) {
    case 'The Hero':
      return 'ring-lightHero'

    case 'The Magician':
      return 'ring-lightMagician'

    case 'The Rebel':
      return 'ring-lightRebel'

    case 'The Creator':
      return 'ring-lightCreator'

    case 'The Synergist':
      return 'ring-lightGreen'

    case 'The Oracle':
      return 'ring-lightOracle'

    case 'The Protector':
      return 'ring-lightProtector'

    case 'The Ruler':
      return 'ring-lightBlue'
  }
}

export const gettestimonialTextCOlor = (character: string) => {
  switch (character) {
    case 'The Hero':
      return 'text-lightHero'

    case 'The Magician':
      return 'text-lightMagician'

    case 'The Rebel':
      return 'text-lightRebel'

    case 'The Creator':
      return 'text-lightCreator'

    case 'The Synergist':
      return 'text-lightGreen'

    case 'The Oracle':
      return 'text-lightOracle'

    case 'The Protector':
      return 'text-lightProtector'

    case 'The Ruler':
      return 'text-lightBlue'
  }
}

export const getBaseColor = (hero: string) => {


  switch (hero) {
    case 'Hero':
      return 'bg-lightHero'

    case 'Magician':
      return 'bg-lightMagician'

    case 'Rebel':
      return 'bg-lightRebel'

    case 'Creator':
      return 'bg-lightCreator'

    case 'Synergist':
      return 'bg-lightGreen'

    case 'Oracle':
      return 'bg-lightOracle'

    case 'Protector':
      return 'bg-lightProtector'

    case 'Ruler':
      return 'bg-lightBlue'

  }

}
export const getBaseBorderColor = (hero: string) => {
  switch (hero) {
    case 'Hero':
      return 'border-darkHero'

    case 'Magician':
      return 'border-darkMagician'

    case 'Rebel':
      return 'border-darkRebel'

    case 'Creator':
      return 'border-darkCreator'

    case 'Synergist':
      return 'border-darkGreen'

    case 'Oracle':
      return 'border-darkOracle'

    case 'Protector':
      return 'border-darkProtector'

    case 'Ruler':
      return 'border-darkBlue'

  }

}
export const getBaseDarkColor = (hero: string) => {


  switch (hero) {
    case 'Hero':
      return 'bg-darkHero'

    case 'Magician':
      return 'bg-darkMagician'

    case 'Rebel':
      return 'bg-darkRebel'

    case 'Creator':
      return 'bg-darkCreator'

    case 'Synergist':
      return 'bg-darkGreen'

    case 'Oracle':
      return 'bg-darkOracle'

    case 'Protector':
      return 'bg-darkProtector'

    case 'Ruler':
      return 'bg-darkBlue'

  }

}

export const getBaseTextColor = (hero: string) => {


  switch (hero) {
    case 'Hero':
      return 'text-darkHero'

    case 'Magician':
      return 'text-darkMagician'

    case 'Rebel':
      return 'text-darkRebel'

    case 'Creator':
      return 'text-darkCreator'

    case 'Synergist':
      return 'text-darkGreen'

    case 'Oracle':
      return 'text-darkOracle'

    case 'Protector':
      return 'text-darkProtector'

    case 'Ruler':
      return 'text-darkBlue'

  }

}

export const getBaseLightTextColor = (hero: string) => {


  switch (hero) {
    case 'Hero':
      return 'text-lightHero'

    case 'Magician':
      return 'text-lightMagician'

    case 'Rebel':
      return 'text-lightRebel'

    case 'Creator':
      return 'text-lightCreator'

    case 'Synergist':
      return 'text-lightGreen'

    case 'Oracle':
      return 'text-lightOracle'

    case 'Protector':
      return 'text-lightProtector'

    case 'Ruler':
      return 'text-lightBlue'

  }

}

export const getTextColor = (hero: string) => {


  switch (hero) {
    case 'Hero':
    case 'Magician':
      return 'text-black-300'

    case 'Rebel':
    case 'Creator':
    case 'Synergist':
    case 'Oracle':
    case 'Protector':
    case 'Ruler':
      return 'text-white-300'

  }

}



