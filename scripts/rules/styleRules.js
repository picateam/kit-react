const path = require('path');
const merge = require('lodash.merge');

let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(config) {
    let isProduction = config.env === 'production';

    let includePaths = [
        path.resolve('node_modules'),
        config.path.src,
        path.join(config.path.src, 'css/sprites')
    ];

    // 样式loader
    let commonLoaders = [
        {
            loader: 'cache-loader',
            options: {
                // provide a cache directory where cache items should be stored
                cacheDirectory: path.resolve('.cache')
            }
        },
        {
            loader: 'css-loader',
            options: {
                localIdentName: '[name]-[local]-[hash:base64:5]',
                modules: config.cssModule,
                sourceMap: config.cssSourceMap,
                importLoaders: 2
            }
        },
        {
            loader: 'postcss-loader'
        }
    ];

    if (isProduction) {
        commonLoaders.splice(0, 0, { loader: MiniCssExtractPlugin.loader });
    }
    else {
        commonLoaders.splice(0, 0, { loader: 'style-loader' });
    }

    const styleRules = {
        css: {
            test: /\.css$/,
            use: commonLoaders,
            include: includePaths
        },
        less: {
            test: /\.less$/,
            use: merge([], commonLoaders).concat([{
                loader: 'less-loader',
                options: {
                    sourceMap: config.cssSourceMap,
                    javascriptEnabled: true
                    // paths: includePaths
                }
            }]),
            include: includePaths
        },
        stylus: {
            test: /\.styl$/,
            use: merge([], commonLoaders).concat([{
                loader: 'stylus-loader'
            }]),
            include: includePaths
        },
        sass: {
            test: /\.s(a|c)ss$/,
            use: merge([], commonLoaders).concat([{
                loader: 'sass-loader',
                options: {
                    sourceMap: config.cssSourceMap,
                }
            }]),
            include: includePaths
        }
    };

    let rules = [];

    config.style.forEach((styleParam) => {
        let style = (styleParam === 'scss') ? 'sass' : styleParam;
        let rule = styleRules[style] || '';
        rule && rules.push(rule);
    });

    return rules;
};
