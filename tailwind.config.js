/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/login-page.jpg')",
        reg: "url('/register-page.jpg')",
        err: "url('/error-page.jpg')",
      },
    },
  },
  plugins: [],
};
