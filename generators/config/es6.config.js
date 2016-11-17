module.exports = function () {
    return {
        webpack: {
            eslint: `{
                configFile: '.eslintrc'
            }`,
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        loader: '"eslint-loader"',
                        exclude: /node_modules/
                    }
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: '"babel"',
                        query: `{
                            presets: ['es2015'],
                            plugins: ['transform-runtime']
                        }`
                    }
                ]
            }
        },
        npm: {
            devDependencies: {
                'eslint': 'latest',
                'eslint-loader': 'latest',
                'eslint-config-airbnb-base': 'latest',
                'eslint-plugin-import': 'latest',
                "babel-core": "latest",
                "babel-loader": "latest",
                "babel-plugin-transform-runtime": "latest",
                "babel-preset-es2015": "latest",
                "babel-runtime": "latest",
            }
        },
        eslint: {
            "extends": "airbnb-base",
            "global-strict": ["error", "always"],
            "env": {
                "browser": true,
                "node": true,
                "jasmine": true
            },
            "indent": ["error", 4],
            settings: {
                "import/resolver": {
                    "webpack": {}
                }
            }
        }
    };
};