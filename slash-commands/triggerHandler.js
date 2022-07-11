import asyncTriggerHandler from "./asyncTriggerHandler.js"

const triggers = new Set()

export default function triggerHandler(type, content) {
    //"content" is either an 'interaction' or a 'message' based on type 
    //type 'chk': 'message', 'cmd': 'interaction'

    if (type === 'chk') {
        asyncTriggerHandler(content, triggers)
        return
    }
    
    const interaction = content
    const options = interaction.options
    const actionType = options.getSubcommand()

    if (actionType === 'add') {
        const triggerNew = options.getString('word')
        if (triggers.has(triggerNew)) {
            interaction.reply({
                content: `**${triggerNew}** already exists as a trigger.`,
                ephemeral: true
            })
        } else {
            triggers.add(triggerNew)
            interaction.reply({
                content: `**${triggerNew}** has been added successfully as a new trigger word.`
            })
        }
    } else if (actionType === 'remove') {
        const triggerRemove = options.getString('word')
        if (!triggers.has(triggerRemove)) {
            interaction.reply({
                content: `**${triggerRemove}** does not exist as a trigger.`,
                ephemeral: true
            })
        } else {
            triggers.delete(triggerRemove)
            interaction.reply({
                content: `**${triggerRemove}** has been removed as a trigger.`
            })
        }
    } else if (actionType === 'display') {
        if (triggers.size === 0) {
            interaction.reply({
                content: 'No triggers set. Add a trigger with: ```/trigger add <*YOUR WORD*>```',
                ephemeral: true
            })
        } else {
            let printArr = []
            triggers.forEach(value => {
                printArr.push(value)
            })
            interaction.reply({
                content: "```" + printArr + "```"
            })
        }
    }
}