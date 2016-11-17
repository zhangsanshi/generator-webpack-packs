var webpackDevServer = require("webpack-dev-server");
var webpack = require('webpack');
var config = require('./webpack.config.js');
config.entry.main.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
config.entry.main.push('./webpack.server.help.js');
config.output.path = require("path").resolve(config.output.path);
config.plugins.push(new webpack.HotModuleReplacementPlugin());
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    quiet: false,
    noInfo: false
});
server.listen(8080);
