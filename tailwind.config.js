module.exports = {
  content: ["./public/**/*.{html,js}", "./src/**/*.{ts,js,css}"],
  theme: {
    extend: {},
    colors: {
      'primary': '#495E57',
      'secondary': '#F4CE14',
      'tertiary': '#737373',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
