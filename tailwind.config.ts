import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-[#C69B6D]", // fighter
    "bg-[#FFF468]", // rogue
    "bg-[#3FC7EB]", // wizard
    "bg-[#FF7C0A]", // druid
    "bg-[#C41E3A]", // barbarian
    "bg-[#0070DD]", // bard
    "bg-[#AAAAAA]", // cleric
    "bg-[#00FF98]", // monk
    "bg-[#F48CBA]", // paladin
    "bg-[#AAD372]", // ranger
    "bg-[#A330C9]", // sorcerer
    "bg-[#8788EE]", // warlock
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
