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

client.on("messageCreate", async message => {
    
    if (message.content === "!ping") {
        var chance = Math.random()
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
        
    } else if (message.content.search("female") != -1) {
        message.channel.send("pogo")
    } else if (message.content.search("women") != -1) {
        message.channel.send("pogo")
    } else if (message.content.search("woman") != -1) {
        message.channel.send("pogo")
    } else if (message.content.search("fem") != -1) {
        message.channel.send("pogo")
    }
})

client.login("OTAxNjAwMDU1MzIzMTQwMTU3.YXSOfA.rwCUjtNmzJWIQqFYwGtUemRAbfI");