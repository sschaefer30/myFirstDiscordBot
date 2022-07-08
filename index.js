import commandsHub from "./commands/commandsHub.js"

import Discord from "Discord.js"

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
})

const triggers = new Set();
client.on("messageCreate", async message => {
    commandsHub(message)
})

client.login("OTAxNjAwMDU1MzIzMTQwMTU3.GH97Rm.pUSJNp-0OdXvd1WAhtOjA8ROv94MKzbwvJPyzE");


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