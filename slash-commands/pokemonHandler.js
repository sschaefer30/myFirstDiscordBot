import fetch from "node-fetch"
import Discord from "Discord.js"
import { renderMatches } from "react-router-dom"

export default function pokemonHandler(interaction) {
    //const actionType = interaction.getSubcommand()
    
    const options = interaction.options
    const name = options.getString('name').toLowerCase()
    const call = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(call)
        .then(response => response.json())
        .then(data => {
            pokemonOut(interaction, data)
        })
}

function pokemonOut(interaction, data) {
    const pokeEmbed = {
        color: '#FFFF00',
        title: data.name.toUpperCase(),
        image: {
            url: data.sprites.front_default
        }
        // thumbnail: {
        //     url: data.sprites.front_default
        // },
        // description: `${data.name} is a`
    }
    console.log(data.species.url)
    fetch(data.species.url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    interaction.reply({
        embeds: [pokeEmbed]
    })
}
// Sample API call: 'bulbasaur'
// {
//     abilities: [
//       { ability: [Object], is_hidden: false, slot: 1 },
//       { ability: [Object], is_hidden: true, slot: 3 }
//     ],
//     base_experience: 64,
//     forms: [
//       {
//         name: 'bulbasaur',
//         url: 'https://pokeapi.co/api/v2/pokemon-form/1/'
//       }
//     ],
//     game_indices: [
//       { game_index: 153, version: [Object] },
//       { game_index: 153, version: [Object] },
//       { game_index: 153, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] },
//       { game_index: 1, version: [Object] }
//     ],
//     height: 7,
//     held_items: [],
//     id: 1,
//     is_default: true,
//     location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/1/encounters',
//     moves: [
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] },
//       { move: [Object], version_group_details: [Array] }
//     ],
//     name: 'bulbasaur',
//     order: 1,
//     past_types: [],
//     species: {
//       name: 'bulbasaur',
//       url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
//     },
//     sprites: {
//       back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
//       back_female: null,
//       back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
//       back_shiny_female: null,
//       front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
//       front_female: null,
//       front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
//       front_shiny_female: null,
//       other: {
//         dream_world: [Object],
//         home: [Object],
//         'official-artwork': [Object]
//       },
//       versions: {
//         'generation-i': [Object],
//         'generation-ii': [Object],
//         'generation-iii': [Object],
//         'generation-iv': [Object],
//         'generation-v': [Object],
//         'generation-vi': [Object],
//         'generation-vii': [Object],
//         'generation-viii': [Object]
//       }
//     },
//     stats: [
//       { base_stat: 45, effort: 0, stat: [Object] },
//       { base_stat: 49, effort: 0, stat: [Object] },
//       { base_stat: 49, effort: 0, stat: [Object] },
//       { base_stat: 65, effort: 1, stat: [Object] },
//       { base_stat: 65, effort: 0, stat: [Object] },
//       { base_stat: 45, effort: 0, stat: [Object] }
//     ],
//     types: [ { slot: 1, type: [Object] }, { slot: 2, type: [Object] } ],
//     weight: 69
//   }