/** @type {import('tailwindcss').Config} */

import TailwindForms from '@tailwindcss/forms'

export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    TailwindForms
  ],
}

