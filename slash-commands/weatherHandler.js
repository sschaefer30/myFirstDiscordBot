import fetch from "node-fetch"
import { MessageEmbed } from 'discord.js'
import { Table } from 'embed-table'

/*
    '/weather' command handled here.
    API call using https://www.weatherapi.com/ service.

    NOTES**: 
    - Limited API calls per month, so prevent spamming by implementing a time limit for users in the future.
    - Add options for air quality and alerts (forecast)

*/

// Caches
let dataMap = new Map()
let forecastDataMap = new Map()

// Global vars
let forecastCurrentDisplay = null


export default function weatherHandler(interaction, options, key, globalOptions) {
    if (interaction.isButton()) {
        if (interaction.customId.startsWith("weatherForecast")) {
            weatherForecastButtonHandler(interaction)
        }
        return
    }
    const actionType = options.getSubcommand()
    const location = options.getString('city')

    if (actionType === 'forecast') {
        if (forecastDataMap.has(location)) {
            if (checkExpired(location)) {
                weatherForecastOut(interaction, forecastDataMap.get(location), null, true, globalOptions)
                console.log("Cache FORECAST Used!")
                return
            } else {
                console.log("Cached weather outdated")
            }
        }
        const call = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=2&aqi=no&alerts=yes`
        fetch(call)
            .then(response => response.json())
            .then(data => {
                weatherForecastOut(interaction, data, location, false, globalOptions)
            })
    } else if (actionType === 'current'){
        if (dataMap.has(location)) {
            if (checkExpired(location)) {
                weatherOut(interaction, dataMap.get(location), null, true, globalOptions)
                console.log("Cache Used! :^)")
                return
            } else {
                console.log("Cached weather outdated by 30 min + :(")
            }
        }
        const call = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`
        fetch(call)
            .then(response => response.json())
            .then(data => {
                weatherOut(interaction, data, location, false, globalOptions)
            })
    }
}

function checkExpired(location) {
    let last_updated_date = new Date(dataMap.get(location).current.last_updated)
    last_updated_date.setDate(last_updated_date.getMinutes() + 30)
    if (new Date() <= last_updated_date) {
        return true
    } else {
        return false
    }
}

function weatherForecastOut(interaction, data, location, cache, globalOptions) {
    if (!cache) {
        if (data.error) {
            interaction.reply({
                content: "ERROR: Invalid location.",
                ephemeral: true
            })
            return
        }
        forecastDataMap.set(location, data)
    }
    const locationData = data.location
    const currentData = data.current
    const forecastData1 = data.forecast.forecastday[0].hour
    const forecastData2 = data.forecast.forecastday[1].hour
    const hourlyData = forecastData1.concat(forecastData2)
    const myFields = []
    let twelveHoursPlus = new Date()
    twelveHoursPlus.setDate(twelveHoursPlus.getHours() + 8)
    for (let i = 0; i < hourlyData.length; i++) {
        let hourlyDataDate = new Date(hourlyData[i].time)
        if (hourlyDataDate >= new Date() && hourlyDataDate < twelveHoursPlus) {
            const temp_display = globalOptions.metric === false ? `${hourlyData[i].temp_f}??F` : `${hourlyData[i].temp_c}??C`
            myFields.push({
                name: hourlyData[i].time.slice(5, 16),
                value: `${temp_display}, ${hourlyData[i].condition.text}`,
                inline: true
            })
        }
    }
    const forecastEmbed = {
        title: `Weather Forecast  ${data.forecast.forecastday[0].date}`,
        thumbnail: {
            url: `https:${currentData.condition.icon}`
        },
        description: `Your weather forecast for ${locationData.name}, ${locationData.region}, ${locationData.country}.`,
        fields: myFields,
        timestamp: new Date(),
        footer: {
            text: 'Courtesy of https://www.weatherapi.com/'
        }
    }
    interaction.reply({
        embeds: [forecastEmbed]
    })
    // const msg = interaction.reply({
    //     embeds: [forecastEmbed],
    //     components: [
    //         {
    //             type: 1,
    //             components: [ 
    //                 // {
    //                 //     type: 2,
    //                 //     label: "Backward",
    //                 //     style: 1,
    //                 //     custom_id: "weatherForecastBackward"
    //                 // },
    //                 // {
    //                 //     type: 2,
    //                 //     label: "Forward",
    //                 //     style: 1,
    //                 //     custom_id: "weatherForecastForward"
    //                 // },
  
    //             ]
    //         }
    //     ]
    // })
}

function weatherForecastButtonHandler(interaction) {
    let data = forecastCurrentDisplay
    const locationData = data.location
    const currentData = data.current
    const forecastData = data.forecast.forecastday[0]
    const hourlyData = forecastData.hour
    interaction.reply({
        embeds: [
            {
                title: "your mom",
                description: "yupcock"
            }
        ]
    })
    if (interaction.customId === "weatherForecastForward") {
        console.log("fwd")
    } else if (interaction.customId === "weatherForecastBackward") {
        console.log("bkwd")
    }
}

function weatherOut(interaction, data, location, cache, globalOptions) {
    if (!cache) {
        if (data.error) {
            interaction.reply({
                content: "ERROR: Invalid location.",
                ephemeral: true
            })
            return
        }
        dataMap.set(location, data)
    }
    const locationData = data.location
    const weatherData = data.current

    const temp_display = globalOptions.metric === false ? `${weatherData.temp_f}??F` : `${weatherData.temp_c}??C`
    const feels_like_display = globalOptions.metric === false ? `${weatherData.feelslike_f}??F` : `${weatherData.feelslike_c}??C`
    
    if (globalOptions.raw) {
        const table = ` \`\`\`
            ***LOCATION DATA***
            Name:                               ${locationData.name} 
            Region:                             ${locationData.region}
            Country:                            ${locationData.country}
            Coordinates(Lat, Long):             (${locationData.lat}, ${locationData.lon})
            Time Zone:                          ${locationData.tz_id}
            Local Time:                         ${locationData.localtime}
            Local Time Epoch:                   ${locationData.localtime_epoch} 
            
            ***WEATHER DATA***
            Last Updated:                       ${weatherData.last_updated}
            Temp (C):                           ${weatherData.temp_c}
            Temp (F):                           ${weatherData.temp_f}
            Is Day?:                            ${weatherData.is_day}
            Descriptor:                         ${weatherData.condition.text}
            Icon: ${weatherData.condition.icon}
            Descriptor/Icon Code:               ${weatherData.condition.code}
            Wind (MPH):                         ${weatherData.wind_mph}
            Wind (KPH):                         ${weatherData.wind_kph}
            Wind Degree:                        ${weatherData.wind_degree}
            Wind Direction:                     ${weatherData.wind_dir}
            Pressure (mb):                      ${weatherData.pressure_mb}
            Pressure (in):                      ${weatherData.pressure_in}
            Precipitation (mm):                 ${weatherData.precip_mm}
            Precipitation (in):                 ${weatherData.precip_in}
            Humidity:                           ${weatherData.humidity}%
            Cloud Cover:                        ${weatherData.cloud}%
            Feels Like (C):                     ${weatherData.feelslike_c}
            Feels Like (F):                     ${weatherData.feelslike_f}
            Visibility (km):                    ${weatherData.vis_km}
            Visibility (mi):                    ${weatherData.vis_miles}
            UV Level:                           ${weatherData.uv}
            Gust Speed (MPH):                   ${weatherData.gust_mph}
            Gust Speed (KPH):                   ${weatherData.gust_kph}
            \`\`\` `

        interaction.reply({
            content: table
        })
    } else {
        if (globalOptions.high_detail === true) {
            const windInfo = globalOptions.metric === false ? `${weatherData.wind_mph} MPH, ${weatherData.wind_degree}?? ${weatherData.wind_dir}`: `${weatherData.wind_kph} KPH, ${weatherData.wind_degree}?? ${weatherData.wind_dir}`
            const visibilityInfo = globalOptions.metric === false ? `${weatherData.vis_miles} mi`: `${weatherData.vis_km} km`
            const gustInfo = globalOptions.metric === false ? `${weatherData.gust_mph} MPH`: `${weatherData.gust_kph} KPH`
            const weatherHighDetailInfo = {
                color: weatherData.is_day ? '#0099ff': '#000000',
                title: 'High Detail Weather Report',
                thumbnail: {
                    url: `https:${weatherData.condition.icon}`
                },
                description: `Your *high detail* weather report for ${locationData.name}, ${locationData.region}, ${locationData.country}.`,
                fields: [
                    {
                        name: `Coordinates for ${locationData.name}`,
                        value: `(${locationData.lat}, ${locationData.lon})`
                    },
                    {
                        name: 'Last Updated',
                        value: weatherData.last_updated
                    },
                    {
                        name: 'Current Weather',
                        value: weatherData.condition.text
                    },
                    {
                        name: 'Temperature',
                        value: temp_display
                    },
                    {
                        name: 'Feels Like',
                        value: feels_like_display
                    },
                    {
                        name: 'Humidity',
                        value: `${weatherData.humidity}%`
                    },
                    {
                        name: 'Wind Info',
                        value: windInfo
                    },
                    {
                        name: 'Cloud Cover',
                        value: `${weatherData.cloud}%`
                    },
                    {
                        name: 'Visibility',
                        value: visibilityInfo
                    },
                    {
                        name: 'Gust Speeds',
                        value: gustInfo
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Courtesy of https://www.weatherapi.com/'
                }
            }
            interaction.reply({
                embeds: [weatherHighDetailInfo]
            })
        } else {
            const weatherInfo = {
                color: weatherData.is_day ? '#0099ff': '#000000',
                title: 'Weather Report',
                thumbnail: {
                    url: `https:${weatherData.condition.icon}`
                },
                description: `Your weather report for ${locationData.name}, ${locationData.region}, ${locationData.country}.`,
                fields: [
                    {
                        name: 'Last Updated',
                        value: weatherData.last_updated
                    },
                    {
                        name: 'Current Weather',
                        value: weatherData.condition.text
                    },
                    {
                        name: 'Temperature',
                        value: temp_display
                    },
                    {
                        name: 'Feels Like',
                        value: feels_like_display
                    },
                    {
                        name: 'Humidity',
                        value: `${weatherData.humidity}%`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Courtesy of https://www.weatherapi.com/'
                }
            }
            interaction.reply({
                embeds: [weatherInfo]
            })
        }
    }
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

// OLD High detail output, replaced for embedded version

// const table = globalOptions.metric === false ? ` \`\`\` 
//                 Location: ${locationData.name}, ${locationData.region}, ${locationData.country}
//                 Local Time: ${locationData.localtime} (Timezone: ${locationData.tz_id})

//                 LAST_UPDATED: ${weatherData.last_updated}
//                 Weather: ${weatherData.condition.text}
//                 Temperature: ${weatherData.temp_f}??F
//                 Feels Like: ${weatherData.feelslike_f}??F

//                 Wind: ${weatherData.wind_mph} MPH, ${weatherData.wind_degree}?? ${weatherData.wind_dir}
//                 Humidity: ${weatherData.humidity}%

//                 Cloud Cover: ${weatherData.cloud}%
//                 Visibility: ${weatherData.vis_miles} Miles

//                 UV Level: ${weatherData.uv}
//                 Gust Speed: ${weatherData.gust_mph} MPH
            
//             \`\`\` `
//             : ` \`\`\` 
//             Location: ${locationData.name}, ${locationData.region}, ${locationData.country}
//             Local Time: ${locationData.localtime} (Timezone: ${locationData.tz_id})

//             LAST_UPDATED: ${weatherData.last_updated}
//             Weather: ${weatherData.condition.text}
//             Temperature: ${weatherData.temp_c}??C
//             Feels Like: ${weatherData.feelslike_c}??C

//             Wind: ${weatherData.wind_kph} KPH, ${weatherData.wind_degree}?? ${weatherData.wind_dir}
//             Humidity: ${weatherData.humidity}%

//             Cloud Cover: ${weatherData.cloud}%
//             Visibility: ${weatherData.vis_km} Kilometers

//             UV Level: ${weatherData.uv}
//             Gust Speed: ${weatherData.gust_kph} KPH
        
//         \`\`\` `

