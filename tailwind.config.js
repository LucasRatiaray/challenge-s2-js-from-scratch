module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{ts,js,css}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      'primary': '#495E57',
      'secondary': '#F4CE14',
      'tertiary': '#737373',
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
