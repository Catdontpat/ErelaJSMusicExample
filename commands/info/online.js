const { MessageEmbed } = require('discord.js');
module.exports={
    name: 'online',
    category: 'info',
    description: 'Shows how many members are online',
    timeout: 10000,
    run: async(client,message,args)=>{
        message.guild.members.fetch().then(fetchedMembers => {
            const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
            const totalidle = fetchedMembers.filter(member => member.presence.status === 'idle');
            const totaldnd = fetchedMembers.filter(member => member.presence.status === 'dnd');
            
            const totalp = new MessageEmbed()
            .setTitle(`Total online!`)
            .addField(`Online:`, totalOnline.size)
            .addField(`Idle:`, totalidle.size)
            .addField(`Dnd:`, totaldnd.size)
            .setColor("GREY");
            message.channel.send(totalp)
        });
    }
}