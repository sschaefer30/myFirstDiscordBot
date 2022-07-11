import triggerFunc from "./triggers.js"
import weatherFunc from "./weather.js"

/*
    Replaced with slash commands! These files are now unused!
*/

export default function commandsHub(message) {
    triggerFunc(message)
    weatherFunc(message)
}