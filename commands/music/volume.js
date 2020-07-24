const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
module.exports={
    name: 'volume',
    category: 'music',
    description: 'Adjust the volume of the bot',
    usage: '[1-100]',
    aliases: ['v', 'Volume'],
    run: async(client,message,args)=>{
        const { channel } = message.member.voice;
        const player = client.music.players.get(message.guild.id);

        if (!player) return message.channel.send("No song/s currently playing in this server.");
        if (!args[0]) return message.channel.send(`Current volume: ${player.volume}`);
        if (!channel || channel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to perform this command.");
        if (Number(args[0]) <= 0 || Number(args) > 100) return message.channel.send("Please pick a volume between 1-100");

        player.setVolume(Number(args[0]));
        return message.channel.send(`Successfully set the volume to: ${args[0]}`)
    }
}