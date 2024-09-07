/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require('daisyui')],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['BDO Grotesk', 'Inter', 'sans-serif'],
    }
  },
  daisyui: {
    themes: [
      {
        "carbon": {
          "primary": "#eab308",
          "secondary": "#e7e5e4",
          "accent": "#fef9c3",
          "neutral": "#a8a29e",
          "base-100": "#3f3f3f",
          "info": "#60a5fa",
          "success": "#86efac",
          "warning": "#fde047",
          "error": "#fb7185",
        },
      },
      "light",
      "retro",
      "lemonade",
      "nord",
      "black",
      "coffee"
    ],
    darkTheme: "black"
  }
}

