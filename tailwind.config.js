/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deepBlue': '#142946',
        'red': '#F90101',
        'lightPink': '#FBF4FC'
      },
      fontFamily: {
        'Nunito': ["Open Sans", "sans-serif"],
        'openSans': ["Nunito", "sans-serif"]
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [],
    base: true, 
    styled: true, 
    utils: true, 
    prefix: "",
    logs: true, 
    themeRoot: ":root",
},
}