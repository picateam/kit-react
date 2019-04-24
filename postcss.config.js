const PostcssImport = require('postcss-import');
const Autoprefixer = require('autoprefixer');
const PostcssAsset = require('postcss-assets');

const {
    SRC_PATH
} = require('./scripts/consts');

module.exports = {
    plugins: [
        PostcssImport({
            path: [SRC_PATH]
        }),
        Autoprefixer({
            browsers: ['iOS 7', '> 0.1%', 'android 2.1']
        }),
        PostcssAsset({
            loadPaths: [SRC_PATH]
        })
    ]
};
