const { prefix } = require('../../config.json');
const { ErelaClient, Utils } = require('erela.js');

const nodes = [
    {
        host: 'localhost',
        port: 2333,
        password: "popukomusic"
    }
]
module.exports = client => {
    client.user.setPresence({
        status: "dnd",
        activity: {
            name: "Music",
            type: "LISTENING"
        }
    })
    console.log(`Logged in as ${client.user.username}`)

    client.music = new ErelaClient(client, nodes);

    client.music.on('nodeConnect', node => console.log('New node connected!'));
    client.music.on('nodeError', (node, error) => console.log(`Node error: ${error.message}`));
    client.music.on('trackStart', (player, track) => player.textChannel.send(`Now playing: **${track.title}**`));
    client.music.on('queueEnd', player => {
        player.textChannel.send("Queue has concluded.")
        client.music.players.destroy(player.guild.id);
    })
    client.music.on('trackStuck', (player, track, message) => player.textChannel.send(`An error has occured on ${track}: ${message}`))
}