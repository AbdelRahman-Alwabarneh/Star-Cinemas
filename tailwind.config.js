// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Roboto Slab", "serif"],
      },
      // Other theme customizations
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"), // Add this line
  ],
};
