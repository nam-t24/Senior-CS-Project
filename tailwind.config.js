/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFBFB",
        foreground: "hsl(var(--foreground))",

        darkmaroon: "#590D24",

        //Color palette from figma
        maroon : "#944E63",
        lightmaroon: "#B47B84",
        brown: "CAA6A6",
        peach: "#FFE7E7",

        //Text colors
        primary: "#FFFBFB", //near white, use as substitute to white text
        heading: "#262626", //dark gray, use for big texts and headings
        body: "#737373", //light gray, use for small texts and body



        //remove soon
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },

    },
  },
  plugins: [],
};
