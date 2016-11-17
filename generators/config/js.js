var _ = require('lodash');
var typescript = require('./ts.config.js');
var es5 = require('./es5.config.js');
var es6 = require('./es6.config.js');
var fs = require('fs');
var choice = [ 'es2015/es6', 'es5', 'typescript'];
var JSConfig = {
    choice: choice,
    default: choice[1]
};

_.assignIn(JSConfig, _.zipObject(choice, [es6, es5, typescript]));

module.exports = JSConfig;