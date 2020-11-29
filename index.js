const Discord = require('discord.js');

const { TOKEN } = process.env

if(!TOKEN){
    console.log('THERE IS NO TOKEN')
} else {
    const { prefix } = require('./config.json')

    const getCommands = require('./utils/commands');

    const client = new Discord.Client();
    client.commands = new Discord.Collection();
    getCommands().forEach(command => client.commands.set(command.name, command));

    client.on('message', message => {
        if(!message.content.startsWith(prefix) || message.author.bot) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            message.channel.send('This command does not exist');
            try {
                client.commands.get('help').execute(message, args);
            } catch (helpError) {
                message.channel.send('Help command is not implemented yet');
            }
        }            
    });

    client.login(TOKEN);
}