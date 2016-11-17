module.exports = function () {
    return {
        webpack: {
            vars: [
                "var autoprefixer = require('autoprefixer');",
                "var precss = require('precss');",
                "var postcssImport = require('postcss-import');"
            ],
            postcss: `function (webpack) {
                return [
                    autoprefixer({
                        browsers: ['> 1%', 'Android 2.3', 'iOS 7']
                    }),
                    precss,
                    postcssImport({
                        addDependencyTo: webpack
                    })
                ];
            }`,
            module: {
                loaders: [
                    {
                        test: /\.less$/,
                        loader: "ExtractTextPlugin.extract('style-loader','css-loader?importLoaders=1!postcss-loader!less-loader')"
                    }
                ]
            }
        },
        npm: {
            devDependencies: {
                'less-loader': 'latest',
                'less': 'latest',
                'precss': 'latest',
                'autoprefixer': 'latest',
                "postcss": "latest",
                "postcss-import": "latest",
                "postcss-loader": "latest",
                "css-loader": "latest",
            }
        }
    };
};