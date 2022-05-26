/** @param { import("..").NS } ns */
export async function main(ns) {
    ns.tprintf(`~~~~~${ns.getScriptName()} [${ns.args}]~~~~~`);
    ns.disableLog(`ALL`);
    ns.tprintf(`This is a helper script containing commonaly used scripting.`);
}

/**
 * String literal for the hacker script.
 */
export var hacker = "hckthat.js";

/**
 * String literal for the runner script
 */
export var runner = "runner.js";

/**
 * String literal for the common script
 */
export var commons = "common.js";

/**
 * String literal for the default name for buySevers.js
 */
export var buySrvName = "bitch";

/** 
 * Returns numbers as shown in the game.
 * @param { import("..").NS } _ns
 * @param { Number } uglyNum A fairly large number or zero if none is provided.
 * @param { Number } decimal Optional. How many digits behind the decimal point. Defaults to zero if undefined.
 * @param { boolean } isItRAM
 * @returns Returns numbers as shown in the game.
 */
export function getPrettyNumber(_ns, uglyNum, decimal, isItRAM) {
    var i = 0, prttyNum = [["", "GB"], ["k", "TB"], ["m", "PB"], ["b", "EB"], ["t", "ZB"], ["q", "YB"], ["Q", "BB"], ["s", "?B"]];
    uglyNum ??=  0;
    while (uglyNum > 999) {
        uglyNum /= 1000;
        ++i;
    }
    return `${uglyNum.toFixed(decimal ?? 0) + prttyNum[i][(isItRAM ?? false) ? 1 : 0]}`;
}

/**
 * Recursively scan for available connected servers.
 * @param { import("..").NS } ns
 * @param { String } hostname The hostname where the scanner will start.
 * @param { Array } exclusions Optional. Default: [] An array of servers to exclude.
 * @param { Boolean } addPurchased Optional. Default: false. If set to true, will also exclude your purchased servers.
 * @returns An array of servers.
 */
export function getConnectedServers(ns, hostname, exclusions, addPurchased) {
    let source = [hostname];
    let output = [];
    exclusions ??= [];
    if (addPurchased ?? false) exclusions = exclusions.concat(ns.getPurchasedServers());
    Array(30).fill().map(_y => source = [...new Set(source.map(s => [s, ns.scan(s)]).flat(2))]);
    for (let src of source) { if (!exclusions.includes(src)) output.push(src) }
    return output;
}