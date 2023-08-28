const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.members.first() || guild.members.cache.get(args[0]);
        const name = args[1]

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff) && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!name) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir isim belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name}\` İsim Değiştirme`);
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name}`);
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısının ismi \`${config.registration.TagSymbol} ${name}\` olarak değiştirildi.`)] }).catch((err) => console.log(err), client.ytick(message))
        client.channels.cache.get(config.logs.isimlog).send({ embeds: [embed.setDescription(`${member} kullanıcısının ismi ${message.author} tarafından \`${name}\` olarak değiştirildi.
      
        \`Kullanıcı:\` ${member} - (**${member.id}**)
        \`İsimi:\` ${name}
        \`Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`Tarih:\` ${moment(Date.now()).format("LLL")}`)] });
    }
}
