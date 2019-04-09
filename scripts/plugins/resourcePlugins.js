const path = require('path');

let Clean = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin-hash');
let WriteFilePlugin = require('write-file-webpack-plugin');
let FileWebpackPlugin = require('file-webpack-plugin');
let HappyPack = require('happypack');
let HtmlResWebpackPlugin = require('html-res-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(config, webpack) {

    let isProduction = config.env === 'production';

    let plugins = [
        new HappyPack({
            id: '1',
            verbose: false,
            loaders: [{
                path: 'babel-loader',
                options: {
                    cacheDirectory: './.cache/'
                }
            }]
        }),
        new HappyPack({
            id: '2',
            verbose: false,
            loaders: [{
                path: 'babel-loader',
                options: {
                    'plugins': [
                        ['transform-react-jsx', { 'pragma': 'h' }]
                    ],
                    cacheDirectory: './.cache/'
                },
            }]
        }),
        new MiniCssExtractPlugin({
            filename: `css/${config.contenthashName}.css`,
            chunkFilename: 'css/[name]-[id]-[hash].css'
        }),

    ];

    if (isProduction) {
        let useCdn = config.useCdn || true;

        if (useCdn) {
            plugins.push(new FileWebpackPlugin({
                'after-emit': [
                    {
                        from: path.join(config.path.dist, '**/*'),
                        to: path.join(config.path.dist, config.path.distCdn),
                        action: 'move',
                        options: {
                            cwd: config.path.dist,
                            absolute: true,
                            ignore: [
                                '*.html',
                                '**/*.html'
                            ]
                        }
                    },
                    {
                        from: path.join(config.path.dist, '*.html'),
                        to: path.join(config.path.dist, config.path.distWebserver),
                        action: 'move',
                        options: {
                            cwd: config.path.dist,
                            absolute: true,
                        }
                    }
                ]
            }));
        }
    }
    else {
        if (config.showSource) {
            plugins.push(new WriteFilePlugin());
        }
    }

    if (config.clean) {
        // plugins.push(new Clean([isProduction ? config.path.dist : config.path.dev], { root: path.resolve() }));
        plugins.push(new Clean());
    }

    // if (config.promise) {
    //     plugins.push(new webpack.ProvidePlugin({
    //         Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise'
    //     }));
    // }

    config.static.forEach((item) => {
        plugins.push(new CopyWebpackPlugin([{
            from: item.src,
            to: (item.dist || item.src) + (item.hash ? '[path]' + config.hashName : '[path][name]') + '.[ext]',
        }]));
    });

    config.html.forEach(function(page, key) {
        plugins.push(new HtmlResWebpackPlugin({
            // removeUnMatchedAssets: true,
            env: isProduction ? 'production' : 'development',
            mode: 'html',
            filename: page.key + '.html',
            template: page.path,
            favicon: 'src/favicon.ico',
            htmlMinify: null,
            entryLog: !key,
            cssPublicPath: isProduction ? config.cssCdn : config.webserver,
            templateContent: function(tpl) {
                return tpl;
            }
        }));
    });

    return plugins;
};
