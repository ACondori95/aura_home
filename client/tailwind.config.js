/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#F3F4F6",
          dark: "#374151",
        },
        success: "#374151",
        error: "#EF4444",
        warning: "#F59E0B",
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
        },
        background: {
          DEFAULT: "#F9FAFB",
          dark: "#2C3140",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
