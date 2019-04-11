const fs = require('fs')
const Discord = require('discord.js')
const client= new Discord.Client()
client.commands = new Discord.Collection()

const config = require('config')

const prefix = config.get('prefix')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


if (!config.get('token')) {
  throw new Error('FATAL ERROR: token is undefined')
}

client.on('ready', () => {
  console.log("connected as ", client.user.tag)
})

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
})

client.login(config.get('token'))