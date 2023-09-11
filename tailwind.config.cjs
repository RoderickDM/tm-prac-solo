/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  fontSmoothing: ["responsive", "hover", "focus"],
  theme: {
    screens: {
      sm: "500px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        accent: "#38c0d2",
        accent_darker: "#508d8e",
        primary: "#6ec0c1",
        secondary: "#273272",
        success: "#188351",
        alert: "#b91c1c",
        alert_darker: "#a51515",
        warning: "#f09a02",
        archive: "#d4c3af	",
        dark: "#1c1e21",
        guray: "#616871",
        light_gray: "#f2f2f2",
      },
      fontFamily: {
        inter: "'Inter', sans-serif",
      },
      fontSize: {
        huge: "clamp(2.4rem, 6vw, 5rem)",
      },
      height: {
        responsive: "clamp(5rem,17vw,22rem)",
      },
      screens: {
        xs: "420px",
      },

      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(2px)" },
          "50%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
          "100%": { transform: "translateX(0)" },
        },
        grow: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.8)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },

        slideUp: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0px)" },
        },

        slideDown: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(10px)" },
        },

        rotate: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },

        dash: {
          "0%": {
            strokeDasharray: "0, 70",
            strokeDashoffset: " 0",
          },
          "50%": {
            strokeDasharray: "180, 80",
            strokeDashoffset: " -15",
          },

          "100%": {
            strokeDasharray: "360, 100",
            strokeDashoffset: " -70",
          },
        },
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },

      animation: {
        shake: "shake .2s ease-in-out",
        slideUp: "slideUp .2s ease-in-out",
        slideDown: "slideDown .2s ease-in-out",
        fadeIn: "fadeIn .2s ease-in-out",
        fadeOut: "fadeOut .2s ease-in-out",
        grow1: "grow 1s ease-in-out infinite",
        grow2: "grow 1s ease-in-out 0.15s infinite",
        grow3: "grow 1s ease-in-out 0.3s infinite",
        grow4: "grow 1s ease-in-out 0.475s infinite",
        dash: "dash 1.5s ease-in-out infinite",
        rotate: "rotate 2s linear infinite",
        loading: "loading 1.5s ease-in  infinite",
        spin2: "spin 60s linear infinite",
      },
    },
  },
  plugins: [],
};
