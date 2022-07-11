

export default function optionsHandler(interaction, globalOptions) {
    const options = interaction.options
    const optionType = options.getSubcommand()

    if (optionType === 'metric') {
        const setting = options.getBoolean('toggle')
        if (setting === true) {
            interaction.reply({ content: "Weather converted to **METRIC**" })
            return {
                ...globalOptions,
                metric: true
            }
        } else {
            interaction.reply({ content: "Units converted to **IMPERIAL**" })
            return {
                ...globalOptions,
                metric: false
            }
        }
    } else if (optionType === 'raw') {
        const setting = options.getBoolean('toggle')
        if (setting === true) {
            interaction.reply({ content: "Raw data **ENABLED** for weather."})
            return {
                ...globalOptions,
                raw: true
            }
        } else {
            interaction.reply({ content: "Raw data **DISABLED** for weather."})
            return {
                ...globalOptions,
                raw: false
            }
        }
    } else if (optionType === 'detail') {
        const setting = options.getBoolean('toggle')
        if (setting === true) {
            interaction.reply({ content: "High detail **ENABLED** for weather."})
            return {
                ...globalOptions,
                high_detail: true
            }
        } else {
            interaction.reply({ content: "High detail **DISABLED** for weather."})
            return {
                ...globalOptions,
                high_detail: false
            }
        }
    }

    return globalOptions
}

