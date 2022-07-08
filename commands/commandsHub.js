import triggerFunc from "./triggers.js"
import weatherFunc from "./weather.js"


export default function commandsHub(message) {
    triggerFunc(message)
    weatherFunc(message)
}