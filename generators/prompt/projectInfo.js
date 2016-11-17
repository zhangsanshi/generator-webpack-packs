module.exports = function () {
    var prompt = [
        {
            type: 'input',
            name: 'name',
            message: 'Your project name is \n',
            default: this.appname
        },
        {
            type: 'input',
            name: 'username',
            message: 'What\'s your Github/GitLab username is \n',
            store: true
        }
    ];
    return this.prompt(prompt).then((function (answers) {
        this.userConfig.name = answers.name;
        this.userConfig.author = answers.username;
    }).bind(this));
};