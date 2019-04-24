// 用户配置的默认值，用于减少对用户暴露参数
const path = require('path');
const merge = require('lodash.merge');

const userConfig = require('../picafile.js');

const utils = require('@pica/webpack-utils');

const {
    SRC_PATH,
    DEV_PATH,
    DIST_PATH,
    SPRITE_PATH,
    ENV,
    DIST_CDN,
    DIST_WEBSERVER,
    isProduction,
} = require('./consts');

const webserver = '//localhost:9000/';
const cdn = '//localhost:8000/';
const port = 9000;

// ========================= webpack快捷配置 =========================
// 基本情况下，你只需要关注这里的配置
let config = {
    // ========================= webpack环境配置 =========================
    env: ENV,

    // ========================= webpack路径与url =========================
    // 项目路径
    path: {
        src: SRC_PATH,
        dev: DEV_PATH,
        dist: DIST_PATH,
        sprite: SPRITE_PATH,
        distCdn: DIST_CDN, // 生成cdn的目录，dist/cdn
        distWebserver: DIST_WEBSERVER // 生成webserver的目录, dist/webserver
    },

    // ========================= webpack服务器及路由配置 =========================
    // 开发服务器配置
    server: {
        webserver,
        cdn,
        cssCdn: cdn,
        imgCdn: cdn,
        port, // port for local server
        route: [], // proxy route, 例如: /news/
        apiPort: 7000, // 后台转发端口，默认配合 steamer-plugin-mock 使用
        apiRoute: ['/api'], // 后台转发路径
    },

    // ========================= webpack自定义配置 =========================
    useCdn: true,  // 是否使用webserver, cdn 分离 html 与其它静态资源

    // 是否显示开发环境下的生成文件
    showSource: true,

    // 是否在生产环境下生成manifest文件
    manifest: false,

    // 是否清理生成文件夹
    clean: true,

    // sourcemap, 请写具体的sourcemap名称，而不是写true
    // 参考文章： https://segmentfault.com/a/1190000004280859
    sourceMap: {
        development: false,
        production: false,
    },

    cssSourceMap: false,

    // javascript 方言，目前仅支持 ts(typescript)
    js: [],

    // 预编译器，默认支持css 和 less. sass, scss 和 stylus，会自动安装
    style: [
        'css', 'less'
    ],
    // 生产环境是否提取css
    extractCss: true,
    // 是否启用css模块化
    cssModule: false,

    // 合图，normal (仅1倍图) , retinaonly (仅2倍图), retina (包括1倍及2倍图), none (不使用合图)
    spriteMode: 'retinaonly',
    // 默认支持less. sass, scss 和 stylus，会自动安装
    spriteStyle: 'css',

    // html 模板. 默认支持html 和 ejs, handlebars 和 pug(原jade)，art(art-template) 会自动安装
    template: [
        'html'
    ],

    // 生产环境下资源(js, css, html)是否压缩
    compress: true,

    // 不经webpack打包的资源
    static: [
        {
            src: 'libs/',
            hash: true
        }
    ],

    // 利用DefinePlugin给应用注入变量
    injectVar: {},

    // webpack resolve.alias 包别名
    alias: {
        '@': path.join(SRC_PATH),
        'IMG': path.join(SRC_PATH, '/img'),
        'CSS': path.join(SRC_PATH, '/css'),
        'JS': path.join(SRC_PATH, '/js')
    },

    // 文件名与哈希, hash, chunkhash, contenthash 与webpack的哈希配置对应
    hashName: isProduction ? ('[name]-[hash:6]') : '[name]',
    chunkhashName: isProduction ? ('[name]-[chunkhash:6]') : '[name]',
    contenthashName: isProduction ? ('[name]-[contenthash:6]') : '[name]',

    // ========================= webpack entry配置 =========================
    // 根据约定，自动扫描js entry，约定是src/page/xxx/main.js 或 src/page/xxx/main.jsx
    /**
        获取结果示例
        {
            'index': [path.join(config.path.src, "/page/index/main.js")],
            'spa': [path.join(config.path.src, "/page/spa/main.js")],
            'pindex': [path.join(config.path.src, "/page/pindex/main.jsx")],
        }
     */
    entry: utils.filterJsFileByCmd(utils.getJsEntry({
        srcPath: path.join(SRC_PATH, 'page'),
        level: 1
    })),

    // 自动扫描html，配合html-res-webpack-plugin
    /**
        获取结果示例
        [
            {
                key: 'index',
                path: 'path/src/page/index/index.html'
            },
            {
                key: 'spa',
                path: 'path/src/page/spa/index.html'
            },
            {
                key: 'pindex',
                path: 'path/src/page/pindex/index.html'
            }
        ]
     */

    html: utils.filterHtmlFileByCmd(utils.getHtmlEntry({
        srcPath: path.join(SRC_PATH, 'page'),
        level: 1
    })),

    // 自动扫描合图，配合webpack-spritesmith插件
    /**
        获取结果示例
        [
            {
                key: 'btn',
                path: 'path/src/img/sprites/btn'
            },
            {
                key: 'list',
                path: 'path/src/img/sprites/list'
            }
        ]
     */
    sprites: utils.getSpriteEntry({
        srcPath: SPRITE_PATH
    }),

    // webpack output
    output: {},

    // webpack module
    module: {},

    // webpack resolve
    resolve: {},

    // webpack plugins
    plugins: [],

    // webpack externals
    externals: isProduction ? {
        'react': 'React',
        'react-dom': 'ReactDOM',
    } : {},
};

config = merge({}, config, userConfig);

// ========================= webpack merge 的策略 =========================
config.webpackMerge = {
    // webpack-merge smartStrategy 配置
    smartStrategyOption: {
        'module.rules': 'append',
        'plugins': 'append'
    },

    // 在smartStrategy merge 之前，用户可以先行对 webpack.base.js 的配置进行处理
    mergeProcess: function(webpackBaseConfig) {
        return webpackBaseConfig;
    }
};

module.exports = config;
