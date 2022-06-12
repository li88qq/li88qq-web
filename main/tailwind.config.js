module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,ts,js,}",
    ],
    theme: {
        extend: {
            flex: {
                '2': '2 2 0%',
                '3': '3 3 0%',
                '4': '4 4 0%',
                '5': '5 5 0%',
            },
            zIndex: {
                '100': '100',
            }
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false
    }
}
