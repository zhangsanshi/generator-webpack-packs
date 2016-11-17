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
                ]
            }
        },
        npm: {
            devDependencies: {
                'eslint': 'latest',
                'eslint-loader': 'latest',
                'eslint-config-airbnb-base': 'latest',
                'eslint-plugin-import': 'latest'
            }
        },
        eslint: {
            "extends": "airbnb-base/legacy",
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