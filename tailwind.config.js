const {heroui} = require('@heroui/theme');
module.exports = {
  plugins: [heroui()],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js"
  ], // Ensure all components are scanned
    theme: {
        extend: {
            colors: {
                foreground: "rgb(241 245 249 / 0.9)", // slate-100 with 90% opacity
                background: "rgb(15 23 42 / 0.9)",// slate-900 with 90% opacity
            },
        },
    },
    safelist: [
        { pattern: /from-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{1,3}/ },
        { pattern: /via-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{1,3}/ },
        { pattern: /to-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{1,3}/ },
        { pattern: /bg-(red|blue|green|purple|indigo|yellow|pink|gray)-(50|100|200|300|400|500|600|700|800|900)/ },
        { pattern: /text-(red|blue|green|purple|indigo|yellow|pink|gray)-(50|100|200|300|400|500|600|700|800|900)/ }
    ],
};
