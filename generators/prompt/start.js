var path = require('path');
var Util = require('../util/util.js');
module.exports = function () {
    var prompts = [];
    var self = this;
    function isExistsInDestination(path) {
        return self.fs.exists(self.destinationPath(path));
    }
    if (isExistsInDestination('./package.json')) {
        prompts.push({
            type: 'confirm',
            name: 'overwrite',
            message: 'the package.json is existed, overwrite it?',
            default: false
        });
    }
    return self.prompt(prompts).then((function (answers) {
        if (answers.overwrite === false) {
            this.log('has a package.json in current path');
            process.exit(1);
        }
    }).bind(self));
};