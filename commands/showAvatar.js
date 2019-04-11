const Discord = require('discord.js')

module.exports = {
  name: 'avatar',
  description: 'Show avatar of user or person mentioned',
  execute(message, args) {
    let member = message.mentions.users.first()

    if (!member) {
      member = message.author
    }

    let embed = new Discord.RichEmbed()
      .setImage(member.avatarURL)
    message.channel.send(embed)
  },
};