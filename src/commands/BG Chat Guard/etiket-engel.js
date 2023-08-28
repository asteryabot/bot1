const db = require("quick.db");
const config = require("../../../config.json")

module.exports = {
    name: "pinasdg",
    aliases: ["poasdng"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        message.reply({ embeds: [embed.setDescription(`Anlık ping: " ${client.ws.ping} ms"`)] });
    } 
}