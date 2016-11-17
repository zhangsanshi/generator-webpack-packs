var generators = require('yeoman-generator');
var _ = require('lodash');
var beautify = require('gulp-beautify');

var start = require('../prompt/start.js');
var projectInfoPrompts = require('../prompt/projectInfo.js');
var projectStylePrompts = require('../prompt/projectStyle.js');
var write = require('../prompt/write.js');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        if (this.appname) {
            this.appname = _.camelCase(this.appname);
        }
    },
    start: function () {
        this.userConfig = this.userConfig || {};
        return start.bind(this)();
    },
    projectInfo: function () {
        return projectInfoPrompts.bind(this)();
    },
    projectStyle: function () {
        return projectStylePrompts.bind(this)();
    },
    beautify: function () {
        this.registerTransformStream(beautify({
            indentSize: 2,
            preserve_newlines: false
        }));
    },
    write: function () {
        return write.bind(this)();
    },
    end: function () {
        var self = this;
        this.log('wait for install.');
        this.npmInstall();
    }
});