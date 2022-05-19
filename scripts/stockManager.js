/** @param {import("../.").NS } ns */
export async function main(ns) {
    ns.tprintf(`~~~~~${ns.getScriptName()} [${ns.args}]~~~~~`);
    ns.disableLog(`ALL`);

    var stonks = ns.stock;
    var symbols = stonks.getSymbols();
    var whatDo = ns.args;
    var caller = whatDo[0];
    var calls = ["query", "buy", "buyMax", "sell", "sellMax", "sellAll"];
    var rpeTxt = "This does nothing for now!";

    switch (caller) {
        case "query":
            ns.tprintf(`[query] \u00bb ${rpeTxt}`)
            break;
        case "buy":
            ns.tprintf(`[buy] \u00bb ${rpeTxt}`)
            break;
        case "buyMax":
            ns.tprintf(`[buyMax] \u00bb ${rpeTxt}`)
            break;
        case "sell":
            ns.tprintf(`[sell] \u00bb ${rpeTxt}`)
            break;
        case "sellMax":
            ns.tprintf(`[sellMax] \u00bb ${rpeTxt}`)
            break;
        case "sellAll":
            ns.tprintf(`[sellAll] \u00bb ${rpeTxt}`)
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
