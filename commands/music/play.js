const { MessageEmbed } = require('discord.js');
const { ErelaClient, Utils } = require("erela.js");
module.exports={
    name: 'play',
    category: 'music',
    description: 'Plays a song requested',
    usage: '<song/playlist name or url>',
    aliases: ['p', 'Play',],
    run: async(client,message,args)=>{
        const { voiceChannel } = message.member;
        // Note: for discord.js master you need to use
        const { channel } = message.member.voice;

        if (!channel) return message.channel.send("You need to be in a voice channel to execute this command.");

        const permission = channel.permissionsFor(client.user);
        if (!permission.has("CONNECT")) return message.channel.send("I do not have permissions to connect to your channel!");
        if (!permission.has("SPEAK")) return message.channel.send("Cannot play song: No permissions to speak!");

        if (!args[0]) return message.channel.send("Please provide a song to play")
 
        // Spawns a player and joins the voice channel.
        const player = client.music.players.spawn({
            guild: message.guild,
            voiceChannel: channel,
            textChannel: message.channel,
        });


        client.music.search(args.join(" "), message.author).then( async res => {
            switch (res.loadType) {
                case "TRACK_LOADED":
                    player.queue.add(res.tracks[0]);
                    message.channel.send(`Added \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\` `);
                    if (!player.playing) player.play()
                    break;

                case "SEARCH_RESULT":
                        let index = 1;
                        const tracks = res.tracks.slice(0, 5);
                        const embed = new MessageEmbed()
                        .setAuthor("Song Selection", message.author.displayAvatarURL)
                        .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
                        .setFooter("Your response time closes within the next 30 seconds, type 'cancel' to cancel the selection");


                        await message.channel.send({ embed: embed })

                        const collector = message.channel.createMessageCollector(m => {
                            return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                        }, { time: 30000, max: 1});

                        collector.on("collect", m => {
                            if (/cancel/i.test(m.content)) return collector.stop("Cancelled")

                            const track = tracks[Number(m.content) - 1];
                            player.queue.add(track)
                            message.channel.send(`Enqueuing \`${track.title}\``)
                            if (!player.playing) player.play();
                        });

                        collector.on("end", (_, reason) => {
                            if (["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled Selection")
                        });
                        break;

                        case "PLAYLIST_LOADED":
                            res.playlist.tracks.forEach(track => player.queue.add(track));
                            const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({ duration: acc.duration + cur.duration })).duration, true);
                            message.channel.send(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);
                            if (!player.playing) player.play()
                            break;
            }
        }).catch(err => message.channel.send(err.message))
    }
}