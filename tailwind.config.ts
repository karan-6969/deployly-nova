
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        terminal: {
          black: "#0F0F0F",
          dark: "#121212",
          gray: "#272727",
          blue: "#00E5FF",
          "blue-dark": "#0088AA",
          yellow: "#FFD60A",
          "yellow-dark": "#CCAA00",
          green: "#00E676",
          "green-dark": "#00AA55",
          purple: "#7B5AF0",
          "purple-dark": "#5D3CBD",
          red: "#FF0044",
          "red-dark": "#CC0033",
          cyan: "#18FFFF",
          magenta: "#FF00FF",
          orange: "#FF8A00"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"]
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(0, 229, 255, 0.5), 0 0 10px rgba(0, 229, 255, 0.3)"
          },
          "50%": {
            boxShadow: "0 0 15px rgba(0, 229, 255, 0.8), 0 0 20px rgba(0, 229, 255, 0.5)"
          }
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        },
        "typing": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "100%" }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        "cursor-blink": "cursor-blink 1s infinite",
        "typing": "typing 2s steps(40, end)",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-right": "fade-in-right 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-in-bottom": "slide-in-bottom 0.4s ease-out",
        "progress-fill": "progress-fill 2s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "rotate-slow": "rotate-slow 15s linear infinite"
      },
      boxShadow: {
        'neon': '0 0 5px rgba(0, 229, 255, 0.5), 0 0 10px rgba(0, 229, 255, 0.3)',
        'neon-hover': '0 0 15px rgba(0, 229, 255, 0.8), 0 0 20px rgba(0, 229, 255, 0.5)',
        'neon-yellow': '0 0 5px rgba(255, 214, 10, 0.5), 0 0 10px rgba(255, 214, 10, 0.3)',
        'neon-green': '0 0 5px rgba(0, 230, 118, 0.5), 0 0 10px rgba(0, 230, 118, 0.3)',
        'neon-red': '0 0 5px rgba(255, 0, 68, 0.5), 0 0 10px rgba(255, 0, 68, 0.3)',
        'neon-purple': '0 0 5px rgba(123, 90, 240, 0.5), 0 0 10px rgba(123, 90, 240, 0.3)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)'
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 90deg at 50% 50%, var(--tw-gradient-stops))',
        'terminal-grid': 'linear-gradient(rgba(39, 39, 39, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(39, 39, 39, 0.3) 1px, transparent 1px)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #00E5FF 0deg, #121212 360deg)',
      },
      backgroundSize: {
        'grid-pattern': '30px 30px',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
