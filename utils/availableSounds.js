const path = require('path');
const fs = require('fs');

const soundsPath = path.resolve(__dirname, '..', 'sounds');

const sounds = fs.readdirSync(soundsPath, { encoding: 'utf8'})

const availableSounds = sounds
    .filter(file => file.endsWith('.mp3'))
    .map(sound => sound.substring(0, sound.lastIndexOf('.')));

module.exports = function() {
    return availableSounds;
}