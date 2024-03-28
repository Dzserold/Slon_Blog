import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      dark: "#222831",
      light: "#eeeeee",
      dark_pink: "#BB4461",
      pink: "#ff5da2",
      black: "#333",
      error: "#ff3333",
    },
  },
  plugins: [],
};
export default config;
