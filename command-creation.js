import Discord from "Discord.js"

/*
    Commands are initialized here to improve modularity.
*/

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

    commands?.create({
        name: 'options',
        description: 'Set your preferences and set options for this bot.',
        options: [
            {
                type: 'SUB_COMMAND',
                name: 'metric',
                description: 'Toggle metric or imperial units.',
                options: [
                    {
                        name: 'toggle',
                        description: 'True for METRIC, False for IMPERIAL.',
                        required: true,
                        type: Discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
                    }
                ]
            },
            {
                type: 'SUB_COMMAND',
                name: 'raw',
                description: 'Toggle whether you want to see the raw weather data instead of text.',
                options: [
                    {
                        name: 'toggle',
                        description: 'Toggle raw data display',
                        required: true,
                        type: Discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
                    }
                ]
            },
            {
                type: 'SUB_COMMAND',
                name: 'detail',
                description: 'Toggle high detail for weather reporting.',
                options: [
                    {
                        name: 'toggle',
                        description: 'Toggle HIGH (True) or LOW (False) level of detail for weather',
                        required: true,
                        type: Discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
                    }
                ]
            }
        ]
    })
}