module.exports = function(config) {
    // 模板loader
    const templateRules = {
        html: {
            test: /\.html$/,
            loader: 'html-loader'
        },
        pug: {
            test: /\.pug$/,
            loader: 'pug-loader'
        },
        handlebars: {
            test: /\.handlebars$/,
            loader: 'handlebars-loader'
        },
        ejs: {
            test: /\.ejs$/,
            loader: 'ejs-loader',
            query: {
                'htmlmin': true, // or enable here
                'htmlminOptions': {
                    removeComments: true
                }
            }
        },
        art: {
            test: /\.art$/,
            loader: 'art-template-loader',
        }
    };

    let rules = [];

    config.template.forEach((tpl) => {
        let rule = templateRules[tpl] || '';
        rule && rules.push(rule);
    });

    return rules;
};
