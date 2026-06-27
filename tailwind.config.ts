import type { Config } from "tailwindcss";

const token = (name: string) => `oklch(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: token("bg"),
        "cream-card": token("surface"),
        sand: token("surface-2"),
        border: token("border"),

        green: {
          DEFAULT: token("green"),
          dark: token("green-dark"),
          light: token("green-light"),
        },
        orange: {
          DEFAULT: token("orange"),
          dark: token("orange-dark"),
          light: token("orange-light"),
        },

        ink: {
          DEFAULT: token("ink"),
          soft: token("ink-soft"),
        },
        muted: token("muted"),
        "on-dark": token("on-dark"),

        success: token("success"),
        warn: token("warn"),
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-body)"],
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [],
};
export default config;
