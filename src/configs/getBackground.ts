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
      return 'border-lightHero'

    case 'Magician':
      return 'border-lightMagician'

    case 'Rebel':
      return 'border-lightRebel'

    case 'Creator':
      return 'border-lightCreator'

    case 'Synergist':
      return 'border-lightGreen'

    case 'Oracle':
      return 'border-lightOracle'

    case 'Protector':
      return 'border-lightProtector'

    case 'Ruler':
      return 'border-lightBlue'

  }

}

export const getBaseTextColor = (hero: string) => {


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



