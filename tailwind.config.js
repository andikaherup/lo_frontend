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
      darkGreen: '#11564a',
      lightGreen: '#258f78',
      darkBlue: '#4E60BE',
      lightBlue: '#939EDD',
      darkRebel: '#962021',
      lightRebel: '#FC1701',
      darkHero: '#ffbb02',
      lightHero: '#FFE500',
      darkMagician: '#F69F2A',
      lightMagician: '#FFC446',
      darkCreator: '#5E03AE',
      lightCreator: '#C96AE5',
      darkOracle: '#651527',
      lightOracle: '#D23B5E',
      darkProtector: '#5A8B24',
      lightProtector: '#A5D775'
    },
    extend: {
      fontFamily: {
        kufam: ['Kufam', 'sans-serif'],
        knewave: ['Knewave', 'cursive']
      },
      animation: {
        'fade-in-bottom': 'fade-in-bottom 1.5s cubic-bezier(0.680, -0.550, 0.265, 1.550)   both',
        'fade-out-top': 'fade-out-top 1.5s cubic-bezier(0.175, 0.885, 0.320, 1.275)   both',
        'focus-in-expand': 'focus-in-expand 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
      },
      keyframes: {
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
        }
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
