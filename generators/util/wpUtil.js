var _ = require('lodash');
var Util = require('./util.js');

function loader (source, webpack) {
    // 根据 test 去重, 这里使用 source 的原因
    var webpackLoaderTests = _.map(webpack, 'test');
    var sourceLoaderTests = _.map(source, 'test');
    var needAddLoaderTests = _.remove(webpackLoaderTests, function (value) {
        return sourceLoaderTests.indexOf(value) === -1;
    });
    // 获取需要进行添加的 loader
    return _.find(webpack, function (value) {
        var check = needAddLoaderTests.indexOf(value.test) !== -1;
        return check;
    });
}

module.exports = {
    extensions: function (source, webpack) {
        source.extensions = Util.concatArray(source.extensions, webpack.extensions);
    },
    vars: function (source, webpack) {
        source.vars = Util.concatArray(source.vars, webpack.vars);
    },
    module: true,
    loaders: function (source, webpack) {
        var needAddLoader = loader(source.loaders, webpack.loaders);
        source.loaders = Util.concatArray(source.loaders, needAddLoader);
    },
    preLoaders: function (source, webpack) {
        var needAddLoader = loader(source.preLoaders, webpack.preLoaders);
        source.preLoaders = Util.concatArray(source.preLoaders, needAddLoader);
    }
};