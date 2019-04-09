module.exports = function(config) {
    // js方言
    const jsRules = {
        ts: {
            test: /\.(tsx|ts)$/,
            loader: 'awesome-typescript-loader'
        }
    };

    let rules = [
        {
            test: /\.js$/,
            loader: 'happypack/loader?id=1',
            exclude: /node_modules/
        },
        {
            test: /\.jsx$/,
            loader: 'happypack/loader?id=2',
            exclude: /node_modules/
        },
    ];

    config.js.forEach((tpl) => {
        let rule = jsRules[tpl] || '';
        rule && rules.push(rule);
    });

    return rules;
};
