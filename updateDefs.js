import { get } from "https"
import { createWriteStream } from "fs"

const url = 'https://raw.githubusercontent.com/bitburner-official/bitburner-src/refs/heads/dev/src/ScriptEditor/NetscriptDefinitions.d.ts'
const path = './index.d.ts'

get(url, (res) => {
    const file = createWriteStream(path)

    res.pipe(file)

    file.on('finish', () => {
        file.close()
        console.log('Netscript Type Definitions Updated')
    })

}).on("error", (err) => {
    console.log("Error: ", err.message)
})