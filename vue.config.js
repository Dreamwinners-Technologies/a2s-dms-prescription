module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pwa: {
        short_name: "a2s-dms-prescription",
        name: "A2S DMS Prescription",
        icon: [{
                "src": "/img/icons/android-chrome-192x192.png",
                "type": "image/png",
                "sizes": "192x192"
            },
            {
                "src": "/img/icons/msapplication-icon-144x144.png",
                "type": "image/png",
                "sizes": "144x144"
            },
            {
                "src": "/img/icons/favicon-32x32.png",
                "type": "image/png",
                "sizes": "32x32"
            }
        ],
        start_url: "/",
        background_color: "#63B884",
        display: "standalone",
        display_override: ["window-controls-overlay"],
        theme_color: "#63B884",
        scope: "/",
        offline_enabled: true,
        workboxOptions: {
            exclude: ['_redirects'],
        }
    }
}