
import {nextui} from "@nextui-org/react";
// const {nextui} = require("@nextui-org/react");
import type { Config } from "tailwindcss";
import { colors } from "./app/configurations/theme/colors";

const config: Config = {

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"


  ],
  theme: {
    extend: {
      mode: 'jit',
      direction: 'rtl',
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

 colors:colors,
      darkMode: 'selector',
      color:{
        blue: {
          900:"#050044"
        }
      }


    },
  },

  darkMode: "class",
  plugins: [nextui(),  require('tailwindcss-rtl'),],

};
export default config;
