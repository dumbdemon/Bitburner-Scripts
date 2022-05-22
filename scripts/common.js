/** @param { import("..").NS } ns */
export async function main(ns) {
    ns.tprintf(`~~~~~${ns.getScriptName()} [${ns.args}]~~~~~`);
    ns.disableLog(`ALL`);
    ns.tprintf(`This is a helper script containing commonaly used scripting.`);
}

/** 
 * Returns numbers as shown in the game.
 * @param { import("..").NS } ns
 * @param { Number } uglyNum A fairly large number.
 * @param { Number } decimal Optional. How many digits behind the decimal point. Defaults to zero if undefined.
 * @returns Returns numbers as shown in the game.
 */
export function getPrettyNumber(ns, uglyNum, decimal) {
    var i = 0, prttyNum = ["", "k", "m", "b", "t", "q", "s"];
    if (!uglyNum) {
        ns.printf(`ERROR: No number passed.`)
        return `???.???${prttyNum[Math.floor(Math.random()*prttyNum.length)]}`
    } else if (!decimal) { decimal = 0 }
    while (uglyNum > 999) {
        uglyNum = uglyNum / 1000;
        ++i;
    }
    return `${uglyNum.toFixed(decimal) + prttyNum[i]}`;
}

/**
 * Recursively scan for available connected servers.
 * @param { import("..").NS } ns
 * @param { Array } srvrsList Position zero must be the source.
 * @returns An array of servers.
 */
export function getConnectedServers(ns, srvrsList) {
    if (!(srvrsList.length >= 1)) { return [] }
    Array(30).fill().map(y => srvrsList = [...new Set(srvrsList.map(s => [s, ns.scan(s)]).flat(2))]);
    return srvrsList;
}