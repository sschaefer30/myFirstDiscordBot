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

    console.log(data)
    message.channel.send(`In ${locationData.name}, ${locationData.country}, it is currently **${weatherData.temp_c}°C (${weatherData.temp_f} °F)** and **${weatherData.condition.text}**.`)
}

//!weather Atlanta ; sample API call
// {
//     location: {
//       name: 'Atlanta',
//       region: 'Georgia',
//       country: 'United States of America',
//       lat: 33.75,
//       lon: -84.39,
//       tz_id: 'America/New_York',
//       localtime_epoch: 1657504160,
//       localtime: '2022-07-10 21:49'
//     },
//     current: {
//       last_updated_epoch: 1657503900,
//       last_updated: '2022-07-10 21:45',
//       temp_c: 24.3,
//       temp_f: 75.7,
//       is_day: 0,
//       condition: {
//         text: 'Partly cloudy',
//         icon: '//cdn.weatherapi.com/weather/64x64/night/116.png',
//         code: 1003
//       },
//       wind_mph: 2.2,
//       wind_kph: 3.6,
//       wind_degree: 10,
//       wind_dir: 'N',
//       pressure_mb: 1013,
//       pressure_in: 29.91,
//       precip_mm: 2.5,
//       precip_in: 0.1,
//       humidity: 89,
//       cloud: 75,
//       feelslike_c: 26.4,
//       feelslike_f: 79.5,
//       vis_km: 16,
//       vis_miles: 9,
//       uv: 6,
//       gust_mph: 9.6,
//       gust_kph: 15.5
//     }
//   }