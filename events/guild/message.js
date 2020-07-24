const Timeout = new Set();
const {prefix} = require('../../config.json');
const ms = require('ms');
module.exports = async(client,message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    const command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${message.author.id}${command.name}`)){
                return message.reply(`This command can only be used every ${ms(command.timeout)}`)
            } else {
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }
        command.run(client, message, args);
    }
}