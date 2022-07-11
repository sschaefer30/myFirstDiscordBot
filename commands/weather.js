import fetch from "node-fetch"
import keys from "../keys.js"

const key = keys.WEATHER_API_KEY

export default function weatherFunc(message) {
    const content = message.content
    if (content.startsWith("!weather ")) {
        const location = content.slice(9, content.length)
        const call = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`
        fetch(call)
            .then(response => response.json())
            .then(data => {
                weatherOut(message, data)
            })
    }
}

function weatherOut(message, data) {
    if (data.error) {
        message.channel.send("ERROR: Invalid location.")
        return
    }
    const locationData = data.location
    const weatherData = data.current

    message.channel.send(`In ${locationData.name}, ${locationData.country}, it is currently **${weatherData.temp_c}°C (${weatherData.temp_f} °F)** and **${weatherData.condition.text}**.`)
}