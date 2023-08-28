const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "kadın",
    aliases: ["k", "girl", "woman"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.members.first() || guild.members.cache.get(args[0]);
        const name = args[1]
        
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff) && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!name) return message.reply({ embeds: [embed.setDescription("Öncelikle geçerli bir isim belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (config.registration.purchase) {
            if (!member.username.includes(config.registration.GuilDTag) && !member.roles.cache.has(config.roles.viprole && config.roles.boosterrole && config.roles.musiciansrole && config.roles.designerrole && config.roles.team)) {
                return message.reply({ embeds: [embed.setDescription(`Şuanlık taglı alımdayız! (${config.registration.TagSymbol})`)] });
            }
        }
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name}`);
        db.add(`kadın_${author.id}`, 1)
        db.add(`toplam_${author.id}`, 1)
              const names = db.get(`isimler_${member.id}`)
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name}\` (<@&${config.registration.onewoman}>)`);
        db.push(`kke_${member.id}`, `${author} \`${moment(Date.now()).format("LLL")}\` (<@&${config.registration.onewoman}>)`)
        await guild.members.cache.get(member.id).roles.add(config.registration.woman);
        await guild.members.cache.get(member.id).roles.remove(config.registration.unregistered)
        if (!names) {
            message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı sunucuya <@&${config.registration.onewoman}> olarak kayıt edildi.`)] }).catch((err) => console.log(err), client.ytick(message))
        } else {
            message.reply({ embeds: [embed.setDescription(`${member} kullanıcısı sunucuya <@&${config.registration.onewoman}> olarak kayıt edildi.\n\n Kullanıcının toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`)] }).catch((err) => console.log(err), client.ytick(message))
        }
        client.channels.cache.get(config.logs.kayıtlog).send({ embeds: [embed.setDescription(`${member} kullanıcısına ${message.author} tarafından <@&${config.registration.onewoman}> olarak kayıt edildi.
      
        \`Kullanıcı:\` ${member} - (**${member.id}**)
        \`İsim ve Yaşı:\` ${name}
        \`Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`Cinsiyet:\` <@&${config.registration.onewoman}>     
        \`Kayıt Tarihi:\` ${moment(Date.now()).format("LLL")}`)] });

        client.channels.cache.get(config.channels.chat).send(`${member} aramıza hoş geldin.`).then((e) => setTimeout(() => { e.delete(); }, 15000));
    }
}