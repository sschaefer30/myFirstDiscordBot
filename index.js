import keys from "./keys.js"
import Discord from "Discord.js"
import weatherHandler from "./slash-commands/weatherHandler.js"
import triggerHandler from "./slash-commands/triggerHandler.js"
import commandCreation from "./command-creation.js"

const client = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true, 

    },
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGE_REACTIONS"
    ]
});

client.on("ready", () => {
    console.log("Ready to go!");

    const guildId = "160539215472361472"
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }
    commandCreation(commands)
    
}) 

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true
        })
    } else if (commandName === 'weather') {
        weatherHandler(interaction, options, keys.WEATHER_API_KEY)
    } else if (commandName === 'trigger') {
        triggerHandler("cmd", interaction)
    }
})


client.on("messageCreate", async message => {
    triggerHandler("chk", message)
})

client.login(keys.BOT_MAIN_KEY);


/* old code for !ping command
    if (message.content === "!ping") {
        let chance = Math.random()
        let out = ""
        if (chance > 0.7) {
            out = "pogO"
        } else if (chance > 0.6) {
            out = "PogOH"
        } else if (chance > 0.3) {
            out = "ur mother"
        } else {
            out = "Pogular World Championship"
        }
        message.channel.send(out)
        message.content.search(/girl/i) !== -1
    }
     */