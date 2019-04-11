const moment = require('moment')

module.exports = {
  name: 'date',
  description: 'date using moment',
  execute(message, args) {
    const dateAndTime = args.shift().toLowerCase() + " " + args.shift().toLowerCase()
    const eventDateAndTime = moment(dateAndTime, "L h:mma", true)

    console.log(`is the time ${dateAndTime} valid? `, eventDateAndTime.isValid())

    if (eventDateAndTime.isValid()) {
      message.channel.send(message.member + ' created an event for ' + eventDateAndTime.format("L h:mma")).then(
        sent => sent.react('✅')
      )
    } else {
      message.reply("Your date and time format is incorrect. Please use the format \`\`MM/DD/YYYY\`\`")
    }

  }
};