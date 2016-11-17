var webpack = require("webpack");
var path = require("path");
var exec = require('child_process').exec;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
<%- vars %>

var DEBUG = "production" !== process.env.NODE_ENV;
var watch = (process.argv.indexOf('--watch') !== -1);

var config = {
    entry: {
        lib: ['jquery'],
        main: ['./src/main.js']
    },
    output: {
        filename: watch ? 'dist/[name].js' : 'dist/[name].min.js',
        path: './',
        publicPath: "./"  // CDN 路径
    },
    resolveLoader: {
        modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
        extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
        packageMains: ["webpackLoader", "webLoader", "loader", "main"]
    },
    resolve: {
        extensions: [<%- extensions ? extensions + ',': extensions%> '', '.js'],
        root: [
            path.join(__dirname, './src'),
            path.join(__dirname, './node_modules')
        ]
    },
    <%if (otherConfig) { %>
    <%for (var key in otherConfig) {%>
        <%-key%>: <%-otherConfig[key]%>,
        <%}}%>
    module: {
    <%if (preLoaders.length){ %>
            preLoaders: [
            <%for (var i = 0; i < preLoaders.length; i++) { var preLoader = preLoaders[i]; %>
                {
                <%for (var key in preLoader) {%>
                <%-key%>: <%-preLoader[key]%>,
                <%}%>
                }<%if(i !== preLoaders.length - 1){%>,<%}%>
            <%}%>
        ],
        <%}%>
        loaders: [
            <%if (loaders.length){ for (var i = 0; i < loaders.length; i++) { var loader = loaders[i]; %>
                {
                <%for (var key in loader) {%>
                <%-key%>: <%-loader[key]%>,
                <%}%>
                },
            <%}}%>
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/,
                loaders: [
                'url?limit=10000&name=dist/images/[name].[ext]?[hash:7]',
                'image-webpack?{bypassOnDebug:true,progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?importLoaders=1!postcss-loader')
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.tmpl/,
                loader: 'underscore-template-loader'
            }, {
                test: /\.mp3$/,
                loader: 'file?name=audio/[name].[ext]?[hash:7]'
            }, {
                test: /\.mp4$/,
                loader: 'file?name=video/[name].[ext]?[hash:7]'
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DefinePlugin({
            DEBUG: DEBUG
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false,
                drop_debugger: !DEBUG,
                drop_console: !DEBUG
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "lib",
            minChunks: Infinity,
        }),
        new ExtractTextPlugin("css/[name].css", {
            allChunks: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: 'main',
            hash: false,
            minify: { //压缩HTML文件
                removeComments: false, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            },
            template: "index.tmpl",
            chunks: ['lib', 'main']
        })
    ]
};
if (DEBUG) {
    config.devtool = 'cheap-module-eval-source-map';
}
module.exports = config;


