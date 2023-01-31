/** @param { import("..").NS } ns */
export async function main(ns) {
    ns.tprintf(`~~~~~${ns.getScriptName()} [${ns.args}]~~~~~`);
    ns.disableLog(`ALL`);
    ns.tprintf(`This is a helper script containing commonaly used scripting/keywords.`);
}

export const hacker = "hckthat.js"; //String literal for the hacker script.
export const runner = "runner.js"; //String literal for the runner script
export const commons = "common.js"; //String literal for the common script
export const buySrvName = "bitch"; //String literal for the default name for buySevers.js

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
    const output = [];
    exclusions ??= [];
    if (addPurchased ?? false) exclusions = exclusions.concat(ns.getPurchasedServers());
    Array(30).fill().map(_y => source = [...new Set(source.map(s => [s, ns.scan(s)]).flat(2))]); // skipcq: JS-0086, JS-D008
    for (const src of source) { if (!exclusions.includes(src)) output.push(src) }
    return output;
}