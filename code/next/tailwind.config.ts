import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundPosition: {
        "right-5": "right 1.25rem center",
      },
      colors: {
        darkblue: "#00447c",
        lightblue: "#7499b8",
        offwhite: "#f4f5ff",
        orange: "#e15525",
      },
      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.9375rem", "1.3125rem"],
        "7xl": ["4.1875rem", "5.5rem"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1720px",
      },
      container: {
        padding: "1.5rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
          "3xl": "1720px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
