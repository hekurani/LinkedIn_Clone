/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#F9FAFA',
          100: '#ECEFF0',
          200: '#DADFE2',
          300: '#CDD5D8',
          400: '#C1CACE',
          500: '#8FA0A7',
          600: '#6D828B',
          700: '#526268',
          800: '#374145',
          900: '#1B2123'
        },
        primary: {
          10: '#FAFDFF',
          25: '#F5FCFF',
          50: '#E6F8FF',
          100: '#B0EAFF',
          200: '#8AE0FF',
          300: '#54D2FF',
          400: '#33C9FF',
          500: '#13B9FF',
          600: '#00ABE8',
          700: '#0085B5',
          800: '#00678C',
          900: '#004F6B'
        },
        secondary: {
          50: '#F4F6FD',
          100: '#E0E3F9',
          200: '#CBD1F5',
          300: '#B5BFF2',
          400: '#A1ACEE',
          500: '#8191E8',
          600: '#354EDA',
          700: '#1F35AC',
          800: '#152372',
          900: '#0A1239'
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D'
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F'
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D'
        }
      },
      fontWeight: {
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800
      },
      fontSize: {
        xxs: '0.625rem'
      },
      screens: {
        xxs: { max: '390px' }, // small mobile screens
        xs: { max: '480px' }, // mobile
        sm: { max: '768px' }, // tablet-sm
        md: { min: '769px', max: '1024px' }, // tablet
        lg: { min: '1025px', max: '1512px' }, // laptop
        xl: { min: '1513px' }, // desktop
        xxl: { min: '2001' } // extra large screens
      },
      boxShadow: {
        small: '0 4px 16px 0px rgba(10,18,57,0.03)',
        medium: '0 0px 24px 0px rgba(0,79,107,0.16)'
      }
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman'
    }
  },
  safelist: [
    {
      pattern:
        /bg-(neutral|primary|secondary|warning|success|danger)-(25|50|100|200|300|400|500|600|700|800|900)/
    }
  ],
  corePlugins: {
    preflight: false
  }
};
