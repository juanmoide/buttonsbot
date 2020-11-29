const fs = require('fs');
const path = require('path');

const commandsPath = path.resolve(__dirname, '..', 'commands');

const commandsFiles = fs.readdirSync(commandsPath, { encoding: 'utf8'});

const commands = commandsFiles
    .filter(file => file.endsWith('.js'))
    .map(command => require(commandsPath + '/' + command));

module.exports = function () {
    return commands;
}