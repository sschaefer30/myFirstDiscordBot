const Discord = require('Discord.js');

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
    if (message.content.startsWith("!")) { //command
        if (message.content.startsWith("!add ")) { //add trigger
            let triggerNew = message.content.slice(5, message.content.length)
            if (triggerNew.search(" ") >= 0) {
                message.channel.send("Please input something without spaces!")
            } else {
                if (triggers.has(triggerNew)) {
                    message.channel.send(triggerNew + " already exists as a trigger!")
                } else {
                    triggers.add(triggerNew)
                    message.channel.send(triggerNew + " was added successfully!")
                }
            }
        } else if (message.content.startsWith("!remove ")) {
            let removeTrigger = message.content.slice(8, message.content.length)
            if (removeTrigger.search(" ") >= 0) {
                message.channel.send("Please input something without spaces!")
            } else {
                if (!triggers.has(removeTrigger)) {
                    message.channel.send(removeTrigger + " does not exist as a trigger!")
                } else {
                    triggers.delete(removeTrigger)
                    message.channel.send(removeTrigger + " was removed successfully!")
                }
            }
        } else if (message.content.startsWith("!triggers")) { //display triggers
            if (triggers.size === 0) {
                message.channel.send("There are no triggers right now.")
            } else {
                triggers.forEach(function (value) {
                    message.channel.send("```" + value + "```")
                })
            }
        }
    } else if (message.author.discriminator !== "1915" ){
        let stop = false
        triggers.forEach(function(value) {
            let msg = message.content.toLowerCase()
            if (msg.search(value) >= 0 && !stop) {
                stop = true
                message.channel.send("PogO")
            }
        })
    }
})

client.login("OTAxNjAwMDU1MzIzMTQwMTU3.YXSOfA.oeeClTrO_N4fBg7WcijZjJv7b40");


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