module.exports = function(config, webpack) {

    let isProduction = config.env === 'production';
    let plugins = [];

    if (isProduction) {
        plugins = [
            new webpack.HashedModuleIdsPlugin({
                hashFunction: 'sha256',
                hashDigest: 'hex',
                hashDigestLength: 10
            })
        ];
    }

    return plugins;
};
