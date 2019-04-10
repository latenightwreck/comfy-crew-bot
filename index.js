const Discord = require('discord.js')
const client= new Discord.Client()

const config = require('config')

const prefix = config.get('prefix')

if (!config.get('token')) {
  throw new Error('FATAL ERROR: token is undefined')
}

client.on('ready', () => {
  console.log("connected as ", client.user.tag)
})

client.on('message', message => {
  if (message.content.startsWith(`${prefix}ping`)) {
    // send back "Pong." to the channel the message was sent in
    message.channel.send('Pong.');
  } else if (message.content === `${prefix}server`) {
    message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
  }
})

client.login(config.get('token'))