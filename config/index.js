let isProduction = process.env.NODE_ENV === 'production';

let config = {

    server: {
        'webserver': '//localhost:9000/',
        'cdn': '//localhost:8000/',
        'port': '9000',
        'apiPort': '7000',
        'apiRoute': ['/api'],
    },

    path: {},

    // 是否使用webserver, cdn 分离 html 与其它静态资源
    useCdn: true,

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

    // ========================= webpack深度配置 =========================
    // 使用了webpack-merge与webpack.base.js进行配置合并
    // 如果上面的配置仍未能满足你，你可以在此处对webpack直接进行配置，这里的配置与webpack的配置项目一一对应

    // webpack output
    getOutput: function() {
        return {};
    },

    // webpack module
    getModule: function() {
        return {};
    },

    // webpack resolve
    getResolve: function() {
        return {};
    },

    // webpack plugins
    getPlugins: function() {
        return [];
    },

    // webpack externals
    getExternals: function() {

        if (isProduction) {
            return {
                'react': 'React',
                'react-dom': 'ReactDOM',
            };
        }

        return {};
    },

    // 其它 webpack 配置
    getOtherOptions: function() {
        return {};
    }
};

module.exports = config;
