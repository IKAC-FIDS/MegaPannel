
import {nextui} from "@nextui-org/react";
// const {nextui} = require("@nextui-org/react");
import type { Config } from "tailwindcss";

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

      colors: {

        blue: {
          100:"#E7EDFF",
          200:"#123288",
          300:"#343C6A",
          400:"#718EBF",
          500:"#539BFF",
          600:"#396AFF",
          700:"#2D60FF",
          800:"#1814F3",
          900:'#0A06F4',

        },
        Indigo:{
          800:"#f5f5f5",
          900:"#4C49ED",

        },
        Teal:{
          600:"#DCFAF8",
          700:"#41D4A8",
          800:"#16DBAA",
          900:"#16DBCC"
        },

        Rose:{
          400:"#FFE0EB",
          500:"#FF82AC",
          600:"#FE5C73",
          700:"#FF6195",
          800:"#FF4B4A",
          900:"#FA00FF",
        },
        Orange:{
          500:"#FFF5D9",
          600:"#FFBB38",
          700:"#FFB11F",
          800:"#FCAA0B",
          900:"#FC7900"
        }

      },
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
