const path = require('path');

let SpritesmithPlugin = require('webpack-spritesmith');

module.exports = function(config, webpack) {

    let plugins = [];

    config.sprites = (config.spriteMode === 'none') ? [] : config.sprites;

    config.sprites.forEach(function(sprites) {
        let style = config.spriteStyle;
        let extMap = {
            css: 'css',
            stylus: 'styl',
            less: 'less',
            sass: 'sass',
            scss: 'scss'
        };
        let spriteMode = (~sprites.key.indexOf('_retina')) ? 'retinaonly' : config.spriteMode;
        let retinaTplMap = {
            retinaonly: '_retinaonly',
            'normal': '',
            'retina': '_retina'
        };
        let retinaTpl = retinaTplMap[spriteMode] || '';

        let spritesConfig = {
            src: {
                cwd: sprites.path,
                glob: '*.png'
            },
            target: {
                image: path.join(config.path.src, 'css/sprites/' + sprites.key + '.png'),
                css: [
                    [
                        path.join(config.path.src, 'css/sprites/' + sprites.key + '.' + extMap[style]),
                        {
                            format: `${sprites.key}${retinaTpl}`
                        }
                    ],
                    [
                        path.join(config.path.src, 'css/sprites/' + sprites.key + '.full.css'),
                        {
                            format: `${sprites.key}${retinaTpl}-full`
                        }
                    ],
                ]
            },
            spritesmithOptions: {
                padding: 2
            },
            apiOptions: {
                cssImageRef: '~' + sprites.key + '.png',
                handlebarsHelpers: {
                    'half': function(val) {
                        return (val.replace('px', '') / 2) + 'px';
                    }
                }
            }
        };

        let templatePath = require.resolve('spritesheet-templates-steamer/lib/templates/' + style + retinaTpl + '.template.handlebars');
        // 引入所有的合图样式模板
        let templateFullPath = require.resolve(`spritesheet-templates-steamer/lib/templates/full${retinaTpl}.template.handlebars`);

        spritesConfig.customTemplates = {
            [`${sprites.key}${retinaTpl}`]: templatePath,
            [`${sprites.key}${retinaTpl}-full`]: templateFullPath
        };

        if (spriteMode === 'retina') {
            spritesConfig.retina = '@2x';
            spritesConfig.target.css[0].push({
                format: `${sprites.key}`
            });
        }
        else {
            spritesConfig.target.css[0].push({
                format: `${sprites.key}${retinaTpl}`
            });
        }

        plugins.push(new SpritesmithPlugin(spritesConfig));
    });

    return plugins;
};
