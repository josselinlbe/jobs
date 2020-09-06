module.exports = {
    publicPath: '',
    "transpileDependencies": [
        "vuetify"
    ],
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "artifactName": "${productName}_desktop.${ext}"
            }
        }
    },
    pwa: {
        name: 'Jobs finder',
        themeColor: '#488f65', // Toolbar color
        msTileColor: '#327c9d',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'teal',
        manifestOptions: {
            name: 'Jobs',
            short_name: "Jobs",
            description: 'A tool trying to find jobs in a region.',
            display: 'standalone',
            background_color: '#38546e'
        },
    },
    productionSourceMap: false,
    css: {
        extract: false
    }
}
