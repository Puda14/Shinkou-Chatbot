/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      height: {
        '77vh': '77vh',
      },
      width: {
        '80vh': '80vh',
        '100vh': '100vh',
        '120vh': '120vh',
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'screen': '80vh'
       }      
    },
  },
  plugins: [],
};
