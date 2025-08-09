/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: "3rem",
    },
    colors: {
      white: {
        DEFAULT: "#ffffff",
        100: "#ddd",
        200: "#777b7f",
      },
      black: {
        DEFAULT: "#000000",
        100: "#111418",
        200: "#212529",
        300: "#333333",
        400: "#232a31",
      },
      slate: {
        DEFAULT: "rgba(0, 0, 0, 0.7)",
        100: "rgba(0, 0, 0, 0.95)",
        200: "rgba(250, 250, 250, 0.15)",
        300: "rgba(255, 255, 255, 0.5)",
        400: "rgba(250, 250, 250, 0.12)",
        500: "rgba(250, 250, 250, 0.8)",
        600: "rgba(250, 250, 250, 0.2)",
      },
      gray: {
        100: "#dee3e4",
        200: "#aab1b8",
        800: "#6c757d",
        900: "#343a40",
      },
      blue: {
        DEFAULT: "#111418",
        100: "#0077B5",
        200: "#80bdff",
        300: "#00ACEE",
        400: "#3F729B",
        500: "#6567A5",
        600: "#3B5998",
      },
      green: {
        DEFAULT: "#20c997",
        100: "#1baa80",
      },
      red: {
        DEFAULT: "rgba(220, 53, 69, 1)",
        100: "#DD4B39",
      },
      yellow: "rgba(255, 139, 7, 1)",
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
    },
    extend: {
      fontSize: {
        "2.5xl": [
          "1.75rem",
          {
            lineHeight: "2.125rem",
          },
        ],
      },
      lineHeight: {
        "extra-loose": "3.5rem",
      },
      spacing: {
        18: "4.5rem",
      },
      maxHeight: {
        hvh: "65vh",
      },
      blur: {
        xs: "2px",
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};
