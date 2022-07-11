import fetch from "node-fetch"

export default function weatherHandler(interaction, options, key) {
    const location = options.getString('city')
    const call = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`
    fetch(call)
        .then(response => response.json())
        .then(data => {
            weatherOut(interaction, data)
        })
}

function weatherOut(interaction, data) {
    if (data.error) {
        interaction.reply({
            content: "ERROR: Invalid location.",
            ephemeral: true
        })
        return
    }
    const locationData = data.location
    const weatherData = data.current

    interaction.reply({
        content: `In ${locationData.name}, ${locationData.country}, it is currently **${weatherData.temp_c}°C (${weatherData.temp_f} °F)** and **${weatherData.condition.text}**.`
    })
}