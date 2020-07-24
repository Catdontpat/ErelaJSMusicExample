const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
module.exports={
    name: 'loopqueue',
    category: 'music',
    description: 'Loops the entire queue',
    run: async(client,message,args)=>{
        const { channel } = message.member.voice;
        const player = client.music.players.get(message.guild.id);

        if (!player) return message.channel.send("No songs are currently queued in this server");
        if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use this command.");

        if(player.queueRepeat === false) {
        player.setQueueRepeat(true)
        message.channel.send(`🔁 Looped Queue`)
        } else {
            player.setQueueRepeat(false);
            message.channel.send(`🔁 Unlooped Queue`)
        }
        
    }
}