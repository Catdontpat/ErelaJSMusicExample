const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
module.exports={
    name: 'leave',
    category: 'music',
    description: 'Ends the queue and makes the bot leave the vc',
    aliases: ['dc', 'disconnect',],
    run: async(client,message,args)=>{
        const { channel } = message.member.voice;
        const player = client.music.players.get(message.guild.id);

        if (!player) return message.channel.send("No songs are currently queued in this server");
        if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use this command.");

        client.music.players.destroy(message.guild.id)
        return message.channel.send("Successfully disconnected")
    }
}