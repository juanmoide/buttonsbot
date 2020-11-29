const availableSounds = require("../utils/availableSounds");
const { SECONDS_30 } = require("../utils/constants");
const play = require("../utils/play");

let timeout = null;

module.exports = {
    name: 'play',
    description: 'Play a sound effect! 🔊',
    execute (message, args) {
        if(!args.length) return message.channel.send(`You didn't provide any arguments, ${message.author}!`)
            
            //Checking if Sound exists
            const [sound] = args;
            const sounds = availableSounds()

            const soundExist = sounds.indexOf(sound) !== -1
            if(!soundExist) return message.channel.send('This sound does not exist.')
            
            // user is connected to voice channel
            // getting voice channel
            const voiceChannel = message.member.voice.channel;
            
            // Performance if user is joined into a voice channel
            if(voiceChannel){
                // Check if bot has permissions
                const permissions = voiceChannel.permissionsFor(message.client.user);
                const cannotJoin = !permissions.has('CONNECT') ||
                !permissions.has('SPEAK') ||
                !permissions.has('VIEW_CHANNEL')
                
                if(cannotJoin) return message.channel.send('I need the permissions to join and speak in your voice channel')

                // Clear timeout
                if(timeout){
                    clearTimeout(timeout)
                }
                
                // Play sound effect
                play(voiceChannel, sound);

                // Set timeout if it does not playing sounds anymore for a minute
                timeout = setTimeout(() => {
                    voiceChannel.leave();
                }, SECONDS_30)
            }else{
                return message.channel.send('You have to join into a voice channel')
            }
    }
}