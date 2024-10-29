module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{scripts,js,css}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('/images/login-bg.png')",
      },
    },
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
