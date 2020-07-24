const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
module.exports={
    name: 'queue',
    category: 'music',
    description: 'Checks the current queue for this guild',
    aliases: ['Queue', 'q',],
    run: async(client,message,args)=>{
        const player = client.music.players.get(message.guild.id)
        if(!player || !player.queue[0]) return (await message.channel.send("No songs currently playing in this guild"));

        let index = 1;
        let string = "";

        if (player.queue[0]) string = `__**Currently Playing**__\n ${player.queue[0].title} - Queued by **${player.queue[0].requester.username}**. \n`;
        if (player.queue[1]) string = `__**Rest of queue**__\n ${player.queue.slice(1, 10).map(x => `**${index++} ${x.title}** - Queued by **${x.requester.username}**`).join("\n")}`;

        const embed = new MessageEmbed()
        .setAuthor(`Queue for ${message.guild.name}`, message.guild.iconURL)
        .setThumbnail(player.queue[0].thumbnail)
        .setDescription(string);

        return message.channel.send(embed);
    }
}