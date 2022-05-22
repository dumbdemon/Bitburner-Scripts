import * as helper from "../scripts/common.js"

var eightCores = 0

for (let i = 1; i < 9; ++i) {
    let cost2Get = Math.pow(10, 9) * Math.pow(7.5, i)
    console.log(`Cores ${i} :: NextLvl Cost $${helper.getPrettyNumber(null, cost2Get, 3)} :: Spent so Far $${helper.getPrettyNumber(null, eightCores, 3)}`)
    eightCores += cost2Get
}

console.log(`In order to get 8 cores you will need $${helper.getPrettyNumber(null, eightCores, 3)} or $${eightCores.toLocaleString("en-us")}`)