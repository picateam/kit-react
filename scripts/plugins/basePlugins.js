let ManifestPlugin = require('webpack-manifest-plugin');

module.exports = function(config, webpack) {

    let isProduction = config.env === 'production';

    let plugins = [
        new webpack.DefinePlugin(config.injectVar)
    ];

    if (isProduction) {
        if (config.manifest) {
            plugins.push(new ManifestPlugin());
        }
    }
    else {
        plugins.push(new webpack.NoEmitOnErrorsPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return plugins;
};
