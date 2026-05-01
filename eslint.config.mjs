const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        cream:        { DEFAULT: '#FDF6EC', dark: '#F5E8D0' },
        cocoa:        { DEFAULT: '#4A2C0A', light: '#7B4F26' },
        gold:         { DEFAULT: '#D4A017', light: '#EAC441' },
        blush:        { DEFAULT: '#F5C6CB', dark: '#E8A0A8' },
        sage:         { DEFAULT: '#8FAF7E', dark: '#6B9060' },
        'yumi-purple': '#7A1F6B',
        'yumi-yellow': '#F2A900',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config