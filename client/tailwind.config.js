/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta de colores personalizada según las especificaciones UX/UI
        "brand-blue": "#2E2E3B", // Aura Blue (Marca)
        "brand-green": "#1DB981", // Aura Green (Primary / Success)
        "brand-red": "#EFE444", // Danger Red (Error)
        "neutral-light": "#F3F4F6", // Light Grey (Fondo de secciones)
        "neutral-dark": "#1F2937", // Texto Principal
      },
      // Usaremos una fuente "Inter" o similar (según especificaciones)
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
