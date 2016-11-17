module.exports = function () {
    return {
        webpack: {
            resolve: {
                extensions: ['.ts', '.tsx']
            },
            module: {
                loaders: [
                    {
                        test: /\.tsx?$/,
                        loader: '"ts-loader"'
                    }
                ]
            }
        },
        npm: {
            devDependencies: {
                'ts-loader': 'latest',
                'typescript': 'latest'
            }
        },
        tsconfig: {
            "compilerOptions": {
                "target": "es5",
                "sourceMap": true
            },
            "exclude": [
                "node_modules"
            ]
        }
    };
};