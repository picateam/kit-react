module.exports = function(config) {
    let isProduction = config.env === 'production';

    let rules = [
        {
            test: /\.ico$/,
            loader: 'url-loader',
            options: {
                name: '[name].[ext]'
            }
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        publicPath: isProduction ? config.imgCdn : config.webserver,
                        limit: 10,
                        name: `img/[path]${config.hashName}.[ext]`
                    }
                }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf)\??.*$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: `font/[path]${config.hashName}.[ext]`
                    }
                }
            ]
        }
    ];

    return rules;
};
