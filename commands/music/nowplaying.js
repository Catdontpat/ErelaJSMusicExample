const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
const { stripIndents } = require("common-tags");
module.exports={
    name: 'nowplaying',
    category: 'music',
    description: 'Shows what song is currently playing',
    aliases: ['np', 'Nowplaying',],
    run: async(client,message,args)=>{
        const player = client.music.players.get(message.guild.id);
        if (!player || !player.queue[0]) return message.channel.send("No songs currently playing in this guild.");
        const { title, author, duration, url, thumbnail } = player.queue[0];

        const embed = new MessageEmbed()
        .setAuthor("Current Song: ", message.author.displayAvatarURL)
        .setThumbnail(thumbnail)
        .setDescription(stripIndents`
        ${player.playing ? "▶️" : "⏸️"} **${title}** \`${Utils.formatTime(duration, true)}\` by ${author}
        `)
        message.channel.send({ embed: embed })
    }
}