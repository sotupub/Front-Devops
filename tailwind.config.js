/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",       // dossiers pages
    "./components/**/*.{js,ts,jsx,tsx}",  // dossiers composants
    "./app/**/*.{js,ts,jsx,tsx}",         // si tu as un dossier app
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
