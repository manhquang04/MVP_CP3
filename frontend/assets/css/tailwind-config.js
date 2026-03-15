// Centralized Tailwind CSS Configuration for WanderTale
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    "primary": "#ff5e00",
                    "background-light": "#f8f7f5",
                    "background-dark": "#221910",
                    "accent-blue": "#00f0ff",
                    "accent-orange": "#ff5e00",
                    "accent-yellow": "#ffeb3b"
                },
                fontFamily: {
                    "display": ["Space Grotesk", "sans-serif"],
                    "serif": ["Playfair Display", "serif"],
                    "script": ["Dancing Script", "cursive"]
                },
                borderRadius: {
                    "DEFAULT": "1rem",
                    "lg": "2rem",
                    "xl": "3rem",
                    "full": "9999px"
                },
            },
        },
    };
}
