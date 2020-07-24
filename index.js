const { Collection, Client, Discord, Activity, Guild } = require('discord.js');
const fs = require('fs');
const client = new Client({
    disableEveryone: true
})
const config = require("./config.json");
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["commands"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
client.on('ready', () => {
    require('./events/client/ready')(client)
})
client.on('message', async message => {
    require('./events/guild/message.js')(client, message)
})

client.login(token)