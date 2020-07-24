const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
module.exports={
    name: 'loop',
    category: 'music',
    description: 'Loops the current song being played',
    run: async(client,message,args)=>{
        const { channel } = message.member.voice;
        const player = client.music.players.get(message.guild.id);

        if (!player) return message.channel.send("No songs are currently queued in this server");
        if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use this command.");

        if(player.trackRepeat === false) {
        player.setTrackRepeat(true)
        message.channel.send(`🔂 Looped`)
        } else {
            player.setTrackRepeat(false);
            message.channel.send(`🔂 Unlooped`)
        }
        
    }
}