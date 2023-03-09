const path = require('path');
const webpack = require('webpack')
const { parsed: enviroment } = require('dotenv').config({ path: path.join(__dirname, './.env') });

module.exports = {
    webpack(config) {
        config.plugins.push(
            new webpack.EnvironmentPlugin(enviroment)
        );
        return config;
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
};