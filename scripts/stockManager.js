import * as hlp from "./common";

/** @param {import("../.").NS } ns */
var rpeTxt = "This does nothing for now!";

export async function main(ns) {
    ns.tprintf(`~~~~~${ns.getScriptName()} [${ns.args}]~~~~~`);
    ns.disableLog(`ALL`);

    var stonks = ns.stock;
    var symbols = stonks.getSymbols();
    var whatDo = ns.args;
    var caller = whatDo[0];
    var calls = ["query", "buy", "buyMax", "sell", "sellMax", "sellAll"];

    switch (caller) {
        case "query":
            query(ns);
            break;
        case "buy":
            buy(ns);
            break;
        case "buyMax":
            buyMax(ns);
            break;
        case "sell":
            sell(ns);
            break;
        case "sellMax":
            sellMax(ns);
            break;
        case "sellAll":
            sellAll(ns);
            break;
        default:
            let what2say = "A script to buy stocks!";
            if (caller && !calls.includes(caller)) { what2say = `[${caller}] is not a recognized command!` }
            ns.tprintf(`${what2say}\nList of commands:` +
            `\nquery <type? owned | available> [...args]`+
            `\nbuy <stock> <amount>` +
            `\nbuyMax <stock>` +
            `\nsell <stock> <amount>` +
            `\nsellMax <stock>` +
            `\nsellAll`);
    }
}

/** @param {import("../.").NS } ns */
function query(ns) {
    return ns.tprintf(`[query] \u00bb ${rpeTxt}`)
}

/** @param {import("../.").NS } ns */
function buy(ns) {
    return ns.tprintf(`[buy] \u00bb ${rpeTxt}`)
}

/** @param {import("../.").NS } ns */
function buyMax(ns) {
    return ns.tprintf(`[buyMax] \u00bb ${rpeTxt}`)
}

/** @param {import("../.").NS } ns */
function sell(ns) {
    return ns.tprintf(`[sell] \u00bb ${rpeTxt}`)
}

/** @param {import("../.").NS } ns */
function sellAll(ns) {
    return ns.tprintf(`[sellAll] \u00bb ${rpeTxt}`)
}

/** @param {import("../.").NS } ns */
function sellMax(ns) {
    return ns.tprintf(`[sellMax] \u00bb ${rpeTxt}`)
}
