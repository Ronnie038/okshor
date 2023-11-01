/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F2659",
        secondary: "#E52D27",
      },
    },
  },
  plugins: [require("daisyui")],
};
