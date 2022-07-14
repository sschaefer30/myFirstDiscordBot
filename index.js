import keys from "./keys.js"
import Discord from "Discord.js"
import weatherHandler from "./slash-commands/weatherHandler.js"
import triggerHandler from "./slash-commands/triggerHandler.js"
import commandCreation from "./command-creation.js"
import optionsHandler from "./slash-commands/optionsHandler.js"
import pokemonHandler from "./slash-commands/pokemonHandler.js"

let globalOptions = {
    metric: false,
    high_detail: false,
    raw: false
}

const unityGuildID = "160539215472361472"

const goblinCaveID = "684835996701163520"

const FCID = "463612083859357697"
/*
    myFirstDiscordBot

    Author: Scott Schaefer
    Project (re)Started: July 9, 2022
    Version: 0.1.0

    Main file for my project. The heart of the program. 

    Program Structure:

    index.js { slash-commands -> {
            triggerHandler.js-> {
                asyncTriggerHandler.js
            },
            weatherHandler.js,
        }, 
        (HIDDEN) keys.js,
        command-creation.js
    }
*/

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

    const guildId = unityGuildID
    const guild = client.guilds.cache.get(guildId)

    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }
    /*
        Slightly jank guild.commands reset.
    */
    guild.commands.set([])
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
        weatherHandler(interaction, options, keys.WEATHER_API_KEY, globalOptions)
    } else if (commandName === 'trigger') {
        triggerHandler("cmd", interaction)
    } else if (commandName === 'options') {
        globalOptions = optionsHandler(interaction, globalOptions)
    } else if (commandName === 'pokemon') {
        pokemonHandler(interaction)
    }
})


client.on("messageCreate", async message => {
    triggerHandler("chk", message)
})

client.login(keys.BOT_MAIN_KEY);


/* old code for !ping command. 

Keep for message content random features.

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