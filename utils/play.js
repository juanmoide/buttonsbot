const path = require('path');

const soundsPath = path.resolve(__dirname, '..', 'sounds');

module.exports = async function(voiceChannel, sound){
    const connection = await voiceChannel.join();
    connection.play(`${soundsPath}/${sound}.mp3`, { volume: 0.75 });
}