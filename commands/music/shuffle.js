const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
module.exports={
    name: 'shuffle',
    category: 'music',
    description: 'Shuffles the queue',
    run: async(client,message,args)=>{
        const { channel } = message.member.voice;
        const player = client.music.players.get(message.guild.id);

        if (!player) return message.channel.send("No song/s currently playing in this server.");
        if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to perform this command.");
       
        player.queue.shuffle();
        return message.channel.send("🔀 Shuffled!")
    }
}