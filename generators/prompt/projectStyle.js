var _ = require('lodash');
var css = require('../config/css.js');
var js = require('../config/js.js');
module.exports = function () {
    var prompt = [
        {
            type: 'checkbox',
            choices: css.choice,
            name: 'css',
            message: 'use ' + css.choice.join(' | '),
            default: [css.default]
        },
        {
            type: 'list',
            choices: js.choice,
            name: 'javascript',
            message: 'use ' + js.choice.join(' | '),
            default: [js.default]
        }
    ];
    return this.prompt(prompt).then((function (answers) {
        var selectCSS = answers.css;
        var selectJS = answers.javascript;
        
        this.userConfig.css = selectCSS;
        this.userConfig.js = [selectJS];
    }).bind(this));
};