const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
module.exports={
    name: 'skip',
    category: 'music',
    description: 'Skips the current song being played',
    aliases: ['s', 'Skip'],
    run: async(client,message,args)=>{
        const player = client.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No songs currently playing in this guild.");

        const { channel } = message.member.voice;
        if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You must be in a voice channel to perform this command.");

        player.stop();
        return message.channel.send("Skipped!");
    }
}