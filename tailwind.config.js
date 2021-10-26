module.exports = {
  purge: ['./src/**/*js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
       '-10': '-10',
      }
    }
  },
  variants: {
    extend: {
      translate:["group-hover"],  
      display: ["group-hover"],
  },
  },
  plugins: [],
}
