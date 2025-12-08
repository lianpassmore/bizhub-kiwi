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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // The Penny "Neon" Palette
        neon: {
          pink: '#FF0099',    // Hot Pink (CTA Buttons)
          cyan: '#00F0FF',    // Electric Blue (Borders/Accents)
          yellow: '#FFD600',  // Golden Kiwi (Highlight text)
          purple: '#7000FF',  // Deep Violet (Gradients)
        },
        // The Dark Backgrounds (Not just black, but deep space blue)
        night: {
          950: '#050511', // Almost black
          900: '#0a0a1f', // Deep purple-black
          800: '#12123a', // Lighter violet
        }
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(to right, #FF0099, #00F0FF)',
        'grid-pattern': "linear-gradient(to right, #12123a 1px, transparent 1px), linear-gradient(to bottom, #12123a 1px, transparent 1px)",
      },
      boxShadow: {
        'neon-pink': '0 0 10px rgba(255, 0, 153, 0.5), 0 0 20px rgba(255, 0, 153, 0.3)',
        'neon-cyan': '0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3)',
      },
      animation: {
        "scroll-up": "scroll-up 40s linear infinite",
        "scroll-down": "scroll-down 40s linear infinite",
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        }
      },
    },
  },
  plugins: [],
};
export default config;