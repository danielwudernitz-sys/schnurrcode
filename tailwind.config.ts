import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F6EEE1",
          2: "#EFE3D0",
        },
        paper: "#FBF7EF",
        ink: {
          DEFAULT: "#2A2420",
          soft: "#5A4F46",
        },
        honey: {
          DEFAULT: "#E9A23B",
          deep: "#C97E1F",
        },
        success: "#5E8C61",
        alert: "#C4553B",
      },
      borderRadius: {
        brand: "22px",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        body: ["var(--font-mulish)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 50px -28px rgba(42,36,32,.4)",
        "card-hover": "0 26px 60px -26px rgba(42,36,32,.5)",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
