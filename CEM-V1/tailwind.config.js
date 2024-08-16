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
          "primary": "#e7e5e4",
          "secondary": "#e7e5e4",
          "accent": "#fef9c3",
          "neutral": "#1f2937",
          "base-100": "#3f3f3f",
          "info": "#60a5fa",
          "success": "#86efac",
          "warning": "#fde047",
          "error": "#fb7185",
          // "primary": "#f59e0b",
          // "secondary": "#f97316",
          // "accent": "#3b82f6",
          // "neutral": "#ff00ff",
          // "base-100": "#1f2937",
          // "info": "#60a5fa",
          // "success": "#a3e635",
          // "warning": "#fde047",
          // "error": "#ff0000",
        },
      },
      "light",
      "retro",
      "lemonade",
      "nord",
      "black",
      "luxury",
      "coffee"
    ],
    darkTheme: "black"
  }
}

