const Discord = require('discord.js');

const availableSounds = require("../utils/availableSounds");
const { SECONDS_30 } = require("../utils/constants");
const play = require("../utils/play");

const sounds = availableSounds()
    .reduce((prev, next) => {
    if(prev === '') return ` - ${next}`
     return `${prev}\n - ${next}`   
    }, '')

const embedSounds = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setDescription(sounds)

module.exports = {
    name: 'list',
    description: 'Show the sound effects list',
    execute (message) {
        message.channel.send('Here is the list of sound effects')
        message.channel.send(embedSounds)
    }
}