var path = require('path');
var _ = require('lodash');
var mkdirp = require('mkdirp');

var JSConfig = require('../config/js.js');
var CSSConfig = require('../config/css.js');
var packageJSON = require('../app/templates/package.json');
var Util = require('../util/util.js');
var wpUtil = require('../util/wpUtil.js');
var targetJSON = null;

/**
 * 这个方法对 webpack 配置分成了多层,webpack 一层,webpack.module 一层, webpack.resolve 一层, 会依次调用合并方法
 * @param source webpack 配置集合
 * @param webpack webpack配置
 */
function mergeWebpack (source, webpack) {
    function merge (source, webpack) {
        _.forEach(webpack, function (value, key) {
            if (_.isFunction(wpUtil[key])) {
                wpUtil[key](source, webpack);
            } else if (!wpUtil[key]) {
                source[key] = webpack[key];
            }
        });
    }
    merge(source, webpack);

    if (webpack.module) {
        if (!source.module) {
            source.module = {};
        }
        merge(source.module, webpack.module);
    }
    if (webpack.resolve) {
        if (!source.resolve) {
            source.resolve = {};
        }
        merge(source.resolve, webpack.resolve);
    }
}

module.exports = function () {
    var self = this;
    var userConfig = this.userConfig;
    var name = userConfig.name;
    var author = userConfig.author;
    var js = userConfig.js;
    var css = userConfig.css;

    var packages = {
        author: author,
        name: name
    };
    var tsconfig = {};
    var eslint = {};
    var webpack = {
        module: {
            loaders: [],
            preLoaders: []
        },
        vars: [],
        resolve: {
            extensions: []
        }
    };

    _.forEach(js, function (item, index) {
        var config = JSConfig[item]();
        _.merge(packages, config.npm);
        _.merge(tsconfig, config.tsconfig);
        _.merge(eslint, config.eslint);
        mergeWebpack(webpack, config.webpack);
    });
    _.forEach(css, function (item, index) {
        var config = CSSConfig[item]();
        _.merge(packages, config.npm);
        mergeWebpack(webpack, config.webpack);
    });
    this.fs.copyTpl(
        this.templatePath('./webpack.config.js'),
        this.destinationPath('./webpack.config.js'),
        {
            vars: webpack.vars.join('\n'),
            extensions: Util.formatOutput(webpack.resolve.extensions, true).replace(/\[(.*)\]/, '$1'),
            loaders: webpack.module.loaders,
            preLoaders: webpack.module.preLoaders,
            otherConfig: _.pickBy(webpack, function (item, key) {
                return ['module', 'resolve', 'vars'].indexOf(key) === -1;
            })
        }
    );
    function output(files) {
        files = _.isArray(files) ? files : [files];
        _.forEach(files, function (fileObj) {
            (function (fileObj) {
                if (!_.isEmpty(fileObj.file)) {
                    Util.output(fileObj.name, fileObj.file);
                }
            })(fileObj);
        });
    }
    output([
        {
            name: './tsconfig.json',
            file: tsconfig
        },
        {
            name: '.eslintrc',
            file: eslint
        }
    ]);

    function isExistsInDestination(path) {
        return self.fs.exists(self.destinationPath(path));
    }

    function copy(files) {
        files = _.isArray(files) ? files : [files];
        _.forEach(files, function (file) {
            (function (file) {
                if (!isExistsInDestination(file)) {
                    self.fs.copy(
                        self.templatePath(file),
                        self.destinationPath(file)
                    );
                }
            })(file);
        });
    }
    copy([
        'src/main.js',
        'open.js',
        'index.tmpl',
        'webpack.server.help.js',
        'webpack.server.js'
    ]);

    function sync(files) {
        files = _.isArray(files) ? files : [files];
        _.forEach(files, function (file) {
            (function (file) {
                if (!isExistsInDestination(file)) {
                    mkdirp.sync(self.destinationPath(file));
                }
            })(file);
        });
    }
    sync([
        'src/images',
        'src/css',
        'test'
    ]);

    if (!isExistsInDestination('package.json')) {
        targetJSON = this.fs.readJSON(this.destinationPath('package.json')) || {};
    }
    Util.output('./package.json', _.merge(packageJSON, packages, targetJSON));
};