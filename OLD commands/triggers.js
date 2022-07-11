const triggers = new Set()

export default function triggerFunc(message) {
    const content = message.content
    console.log(content)
    if (content.startsWith("!")) {
        if (content.startsWith("!add trigger ")) {
            let triggerNew = content.slice(13, content.length)
            if (triggerNew.search(" ") >= 0) {
                message.channel.send("Spaces are not allowed to be in a trigger!")
            } else {
                if (triggers.has(triggerNew)) {
                    message.channel.send("**" + triggerNew + "** already exists as a trigger!")
                } else {
                    triggers.add(triggerNew)
                    message.channel.send("**" + triggerNew + "** was added successfully as a trigger!")
                }
            } 
        } else if (content.startsWith("!remove trigger ")) {
            let removeTrigger = content.slice(16, content.length)
            if (removeTrigger.search(" ") >= 0) {
                message.channel.send("Invalid remove request! (Spaces not permitted to be in a trigger)")
            } else {
                if (!triggers.has(removeTrigger)) {
                    message.channel.send("**" + removeTrigger + "** does not exist as a trigger!")
                } else {
                    triggers.delete(removeTrigger)
                    message.channel.send("**" + removeTrigger + "** was removed successfully!")
                }
            } 
        } else if (content === "!triggers") {
            if (triggers.size === 0) {
                message.channel.send("No triggers set! Add one with: ```!add trigger <*YOUR TRIGGER WORD*>```")
            } else {
                let printArr = []
                triggers.forEach(value => {
                    printArr.push(value)
                })
                message.channel.send("```" + printArr + "```")
            }
        }
    } else if (message.author.discriminator !== "1915") {
        let stop = false
        triggers.forEach(value => {
            let msg = message.content.toLowerCase()
            if (msg.search(value) >= 0 && !stop) {
                stop = true
                message.channel.send("PogO, and who ASKED")
            }
        })
    }
}