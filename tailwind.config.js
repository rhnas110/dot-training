/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#efffe5",
          100: "#daffc7",
          200: "#b6ff95",
          300: "#87fe58",
          400: "#5ff526",
          500: "#3ddc06",
          600: "#29ab00",
          700: "#228506",
          800: "#1f690b",
          900: "#1d580f",
          950: "#093201",
        },
        light: "#FEFDFD",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
