/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem",
      },
      backgroundImage: {
        'wiply-theme': "url('https://res.cloudinary.com/shulgirit/image/upload/v1641896455/wiply/Platform%20Default%20Images/background.jpg')"
      },
    },
  },
  plugins: [],
};
