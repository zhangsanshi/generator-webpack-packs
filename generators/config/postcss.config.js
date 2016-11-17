module.exports = function () {
    return {
        webpack: {
            vars: [
                "var autoprefixer = require('autoprefixer');",
                "var precss = require('precss');",
                "var postcssImport = require('postcss-import');"
            ],
            module: {
                loaders: [
                    {
                        test:   /\.css$/,
                        loader: `"style-loader!css-loader!postcss-loader"`
                    }
                ]
            },
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
        },
        npm: {
            devDependencies: {
                'postcss-loader': 'latest',
                "postcss-import": "latest",
                'precss': 'latest',
                'autoprefixer': 'latest',
                'postcss-loader': 'latest'
            }
        }
    };
};