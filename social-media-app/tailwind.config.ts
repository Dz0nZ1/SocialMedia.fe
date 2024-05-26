import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors")

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {...colors.stone, DEFAULT: colors.stone[950]}
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'mobile':  "960px",
        '0.5xl': '1125px',
        '3xl': '2560px',
      },
      maxWidth: {
        'mainSection': 'calc(100% - 35rem)',
      },
    },
  },
  plugins: [],
};
export default config;
