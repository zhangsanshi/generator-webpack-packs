var fs = require('fs');
var _ = require('lodash');

module.exports = {
    formatOutput: function formatOutput (obj, isNormal) {
        return JSON.stringify(obj, function (key, value) {
            // 正则表达式转义为空对象
            if (value instanceof RegExp) {
                return value.toString();
            }
            return value;
        }, isNormal ? '': '\t') || '';
    },
    output: function output (path, obj) {
        var json = null;
        if (this.isExist(path)) {
            try {
                json = JSON.parse(fs.readFileSync(path));
            } catch (e) {

            }
            if (json) {
                obj = _.extend(json, obj);
            }
        }
        fs.writeFile(path, this.formatOutput(obj));
    },
    concatArray: function (source, target) {
        return _.uniq(_.concat(source || [], target));
    },
    getRegSource: function (input) {
        if (_.isRegExp(input)) {
            return input.source;
        }
        return input;
    },
    isExist: function (path) {
        var isAccess = true;
        try {
            fs.accessSync(path);
        } catch (e) {
            isAccess = false;
        }
        return isAccess;
    }
};