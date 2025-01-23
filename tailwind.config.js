/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        subtitle: "#4B5563",
        title: "#1F2937",
        border: "#E5E7EB",
        primary: "#6D28D9",
      },
    },
  },
  plugins: [],
};
