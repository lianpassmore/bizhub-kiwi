import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff", // Pure White
        foreground: "#0f172a", // Slate 900 (Deep Navy) for text
        
        // The Penny "Pop" Palette (Same colors, used differently)
        neon: {
          pink: '#FF0099',    
          cyan: '#00F0FF',    
          yellow: '#FFD600',  
          purple: '#7000FF',  
        },
        // Readable Neutrals
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          900: '#0f172a', // Main Text
          600: '#475569', // Secondary Text
        }
      },
      boxShadow: {
        // "Hard" shadows instead of "Glows" (Cleaner look)
        'pop': '4px 4px 0px 0px rgba(15, 23, 42, 1)', 
        'pop-hover': '2px 2px 0px 0px rgba(15, 23, 42, 1)',
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
      },
      animation: {
        "scroll-up": "scroll-up 40s linear infinite",
        "scroll-down": "scroll-down 40s linear infinite",
      },
      keyframes: {
        "scroll-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;