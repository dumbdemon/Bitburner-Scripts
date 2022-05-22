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
    let fix = decimal ?? 0;
    var i = 0, prttyNum = ["", "k", "m", "b", "t", "q", "Q", "s"];
    if (!uglyNum && uglyNum != 0) {
        ns.printf(`ERROR: No number passed.`)
        return `???.???${prttyNum[Math.floor(Math.random()*prttyNum.length)]}`
    } 
    while (uglyNum > 999) {
        uglyNum = uglyNum / 1000;
        ++i;
    }
    return `${uglyNum.toFixed(fix) + prttyNum[i]}`;
}

/**
 * Recursively scan for available connected servers.
 * @param { import("..").NS } ns
 * @param { String } hostname The hostname where the scanning where start.
 * @returns An array of servers.
 */
export function getConnectedServers(ns, hostname) {
    let source = [hostname];
    Array(30).fill().map(y => source = [...new Set(source.map(s => [s, ns.scan(s)]).flat(2))]);
    return source;
}

/**
 * Returns an array of servers that you might not touch.
 * @param { import("../.").NS } ns 
 * @param { Boolean } addMySrvrs Optional. Default: false. If set to true, will exclude your purchased servers.
 */
export function notMySrvs(ns, addMySrvrs) {
    let checker = addMySrvrs ?? false;
    let notThese = [
        "home",
        "darweb"
    ];
    if (checker) { notThese.concat(ns.getPurchasedServers()) }
    return notThese;
}