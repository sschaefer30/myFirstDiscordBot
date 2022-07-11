import Discord from "Discord.js"

export default function commandCreation(commands) {
    commands?.create({
        name: 'ping',
        description: 'Replies with pong.'
    })

    commands?.create({
        name: 'weather',
        description: 'Get the weather for any city in the world!',
        options: [
            {
                name: 'city',
                description: 'The city you want the current weather for.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })

    commands?.create({
        name: 'trigger',
        description: 'Trigger words for this server.',
        options: [
            {
                type: 'SUB_COMMAND',
                name: 'add',
                description: 'Add a trigger word!',
                options: [
                    {
                        name: 'word',
                        description: 'Word to be added.',
                        required: true,
                        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
                    }
                ]
            },
            {
                type: 'SUB_COMMAND',
                name: 'remove',
                description: 'Remove a trigger word!',
                options: [
                    {
                        name: 'word',
                        description: 'Word to be removed.',
                        required: true,
                        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
                    }
                ]
            },
            {
                type: 'SUB_COMMAND',
                name: 'display',
                description: 'Display trigger words!'
            }
        ]
    })
}