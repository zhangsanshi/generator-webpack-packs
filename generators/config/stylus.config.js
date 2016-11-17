module.exports = function () {
    return {
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.styl$/,
                        loader: `"style-loader!css-loader!stylus-loader"`
                    }
                ]
            }
        },
        npm: {
            devDependencies: {
                'stylus-loader': 'latest',
                'stylus': 'latest'
            }
        }
    };
};