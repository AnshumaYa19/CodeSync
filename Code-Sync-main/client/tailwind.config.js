/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.jsx", "./*.html"],
    theme: {
        extend: {
            colors: {
                dark: "#0D0F10",
                darkHover: "#181B1D",
                light: "#f5f5f5",
                primary: "#B7FF3C",
                danger: "#FF4D5E",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            animation: {
                "up-down": "up-down 2s ease-in-out infinite alternate",
            },
        },
    },
    plugins: [],
}
