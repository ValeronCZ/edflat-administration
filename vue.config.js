const path = require("path");

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://homestead.test',
                ws: true,
                changeOrigin: true
            },
            '/storage': {
                target: 'http://homestead.test',
                ws: true,
                changeOrigin: true
            },
        }
    },
    outputDir: path.resolve(__dirname, "../../../../public/dist"),
    indexPath: process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../../../../resources/views/admin/home.blade.php')
        : 'index.html',
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/dist'
        : '',
    pluginOptions: {
        i18n: {
            locale: 'sk',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
};