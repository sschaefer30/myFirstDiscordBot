/*
    Helper function for triggerHandler to improve readability.
    This function parses through every message sent in the server to detect any trigger words.

    **NOTES:
    - Maybe doesn't need it's own file?
*/

export default function asyncTriggerHandler(message, triggers) {
    if (message.author.discriminator !== "1915") {
        for (let trigger of triggers) {
            let lowCaseMessage = message.content.toLowerCase()
            if (lowCaseMessage.search(trigger) >= 0) {
                message.channel.send("PogO, and who ASKED")
            }
        }
    }
}