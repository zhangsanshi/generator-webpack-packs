var _ = require('lodash');
var less = require('./less.config.js');
var scss = require('./sass.config.js');
var stylus = require('./stylus.config.js');
var postcss = require('./postcss.config.js');
var choice = ['less+postcss', 'scss', 'stylus', 'postcss'];
var CSSConfig = {
    choice: choice,
    default: choice[0]
};
_.assignIn(CSSConfig, _.zipObject(choice, [less, scss, stylus, postcss]));

module.exports = CSSConfig;
