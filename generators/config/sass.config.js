module.exports = function () {
    return {
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.scss$/,
                        loaders: `["style", "css", "sass"]`
                    }
                ]
            }
        },
        npm: {
            devDependencies: {
                'sass-loader': 'latest',
                'node-sass': 'latest'
            }
        }
    };
};