/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      t: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      orange: '0px 20px 20px -15px rgba(245,56,56,0.81) ',
      'orange-md': '0px 20px 40px -15px rgba(245,56,56,0.81) ',
      blue: '0px 20px 20px -15px rgba(0, 0, 255, 0.81) ',
      'blue-md': '0px 20px 40px -15px rgba(0, 0, 255, 0.81) ',
      none: 'none'
    },
    colors: {
      transparent: 'transparent',
      black: {
        500: '#4F5665',
        600: '#0B132A',
        300: '#000000'
      },
      cardbg: {
        300: '#FBFBFD'
      },
      glaregreen: {
        300: '#21978B'
      },
      greyloading: {
        300: '#E4E5E8'
      },
      creatorrulerbg: {
        300: '#502ABBC2'
      },
      protectorsynergistbg: {
        300: '#1847ED'
      },
      red: {
        900: '#FF1325'
      },
      orange: {
        100: '#FFECEC',
        500: '#F53855'
      },
      blue: {
        300: '#A4CAFE',
        500: '#190495',
        900: '#000F43'
      },
      purple: {
        500: '#8052BB'
      },
      skyblue: {
        500: '#9FE3FA',
        300: '#2196F3'
      },
      yellow: {
        500: '#F7A400',
        300: '#FEDE5C'
      },
      green: {
        500: '#2FAB73'
      },
      white: {
        300: '#F8F8F8',
        500: '#fff'
      },
      gray: {
        100: '#EEEFF2',
        200: '#E5E7EB',
        400: '#AFB5C0',
        500: '#DDDDDD',
        600: '#F5F5F5',
        700: '#FFFFFF'
      },
      backgroundblue: {
        500: '#7D9CDB'
      },
      textcolorblack: {
        300: '#21201D',
        500: '#636363'
      },
      greybackground: {
        300: '#F9F8FC'
      },
      darkGreen: '#11554a',
      lightGreen: '#26917a',
      darkBlue: '#4d5fbe',
      lightBlue: '#97a1de',
      darkRebel: '#9b1010',
      lightRebel: '#FF1600',
      darkHero: '#ffcc00',
      lightHero: '#fff500',
      darkMagician: '#f79e2a',
      lightMagician: '#ffc646',
      darkCreator: '#5c00ad',
      lightCreator: '#cb6ce6',
      darkOracle: '#631426',
      lightOracle: '#d63d60',
      darkProtector: '#598a23',
      lightProtector: '#a7d978',
      badgeGreen: '#E1FCEF',
      textBadgeGreen: '#14804A',
      badgeBlue: '#E1F4FC',
      textBadgeBlue: '#0066FF'
    },
    extend: {
      fontFamily: {
        kufam: ['Kufam', 'sans-serif'],
        knewave: ['Knewave', 'cursive']
      },
      animation: {
        'fade-in-bottom': 'fade-in-bottom 1.5s cubic-bezier(0.680, -0.550, 0.265, 1.550)   both',
        'fade-out-top': 'fade-out-top 1.5s cubic-bezier(0.175, 0.885, 0.320, 1.275)   both',
        'focus-in-expand': 'focus-in-expand 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'tracking-out-contract': 'tracking-out-contract 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'tracking-in-expand': 'tracking-in-expand 0.3s cubic-bezier(0.445, 0.050, 0.550, 0.950) both',
        clip: 'clip 3s',
        reveal: 'reveal 0.5s ',
        hide: 'hide 2.5s '
      }
    },
    keyframes: {
      'tracking-in-expand': {
        '0%': {
          'letter-spacing': '-0.5em',
          opacity: '0'
        },
        '40%': {
          opacity: '0.6'
        },
        '100%': {
          opacity: '1'
        }
      },
      'focus-in-expand': {
        '0%': {
          'letter-spacing': '-0.5em',
          '-webkit-filter': 'blur(12px)',
          filter: 'blur(12px)',
          opacity: '0'
        },
        '100%': {
          '-webkit-filter': 'blur(0px)',
          filter: 'blur(0px)',
          opacity: '1'
        }
      },
      'fade-in-bottom': {
        '0%': {
          transform: 'translateY(50px)',
          opacity: '0'
        },
        to: {
          transform: 'translateY(0)',
          opacity: '1'
        }
      },
      'fade-out-top': {
        '0%': {
          transform: 'translateY(0)',
          opacity: '1'
        },
        to: {
          transform: 'translateY(-50px)',
          opacity: '0'
        }
      },
      'tracking-out-contract': {
        '0%': {
          opacity: '1'
        },
        '50%': {
          opacity: '1'
        },
        '100%': {
          'letter-spacing': '-0.5em',
          opacity: '0'
        }
      },
      clip: {
        '0%, 5%': { clipPath: 'inset(0 100% 0 0)' },
        '30%': { clipPath: 'inset(0 0 0 0)' },
        '40%, 60%': { clipPath: 'inset(0 0 0 0)' },
        '70%': { clipPath: 'inset(0 0 0 0)' },
        '80%, 100%': { clipPath: 'inset(0 0% 0 0)' }
      },
      reveal: {
        '0%, 20%': { width: '0', left: '0' },
        '30%': { width: '0', left: '0' },
        '80%, 82%': { width: '100%', left: '0' },
        '83%, 100%': { width: '0', left: '0' }
      },
      hide: {
        '0%': { width: '0', left: '0' },
        '5%': { width: '100%', left: '0' },
        '7%, 45%': { width: '0', left: '100%' },
        '45%,100%': { width: '0', left: '0' }
      }
    }
  },
  variants: {
    extend: {
      boxShadow: ['active', 'hover']
    }
  },
  plugins: []
}
