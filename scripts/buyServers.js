import * as hlp from "./common";

/** @param {import("../.").NS } ns */
export async function main(ns) {
    ns.tprintf(`~~~~~${ns.getScriptName()} [${ns.args}]~~~~~`);
    const whatDo = ns.args[0];
    var RAM = ns.args[1] ?? 8;
    var oneSrvCost = ns.getPurchasedServerCost(RAM);
    var srvrAmt = ns.getPurchasedServerLimit() - ns.getPurchasedServers.length;
    var reqMny = srvrAmt * oneSrvCost;
    var queryMny = ns.getPurchasedServerLimit() * oneSrvCost;
    
    switch (whatDo) {
        case "buy":
            var i = ns.getPurchasedServers().length;
            if (!isFinite(reqMny)) {
                ns.tprintf(`The RAM you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
                ns.exit();
            } else if (ns.getPurchasedServers().length == ns.getPurchasedServerLimit()) {
                ns.tprintf(`You don't need anymore servers!`);
                ns.exit();
            }
            while (i < ns.getPurchasedServerLimit()) {
                if (ns.getServerMoneyAvailable("home") > oneSrvCost) {
                    var hostname = ns.purchaseServer(`${hlp.buySrvName}-${i}`, RAM);
                    await ns.scp(hlp.commons, hostname);
                    await ns.scp(hlp.hacker, hostname);
                    await ns.scp(hlp.runner, hostname);
                    ns.exec(hlp.runner, hostname);
                    reqMny -= oneSrvCost;
                }
                ++i;
            }
            if (reqMny > 0) {
                if (ns.getPurchasedServers().length == 0) { ns.tprintf(`No servers purchased!\nYou need at least $${hlp.getPrettyNumber(ns, oneSrvCost, 3)} for one server.`) }
                else ns.tprintf(`You need at least $${hlp.getPrettyNumber(ns, reqMny, 3)} more to get ${ns.getPurchasedServerLimit()-ns.getPurchasedServers().length} more server(s)!`);
            }
            break;
        case "query":
            if (ns.getPurchasedServers().length == ns.getPurchasedServerLimit()) {
                ns.tprintf(`You don't need anymore servers!`);
                if (isFinite(queryMny)) {
                    ns.tprintf(`However, you will need $${hlp.getPrettyNumber(ns, queryMny, 3)} to buy ${ns.getPurchasedServerLimit()} servers with ${RAM}GB of RAM.` +
                    `\nFor at least one, you need $${oneSrvCost}.`);
                } else {
                    ns.tprintf(`However, the RAM query you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
                }
            } else if (isFinite(reqMny)) {
                ns.tprintf(`You will need $${hlp.getPrettyNumber(ns, queryMny, 3)} to buy ${ns.getPurchasedServerLimit()} servers with ${RAM}GB of RAM.` +
                `\nFor at least one, you need $${oneSrvCost}.`);
            } else {
                ns.tprintf(`The RAM query you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
            }
            break;
        default:
            ns.tprintf(`Type \`run buyServers.js buy <RAM>\` to buy servers, or type \`run buyServers.js query <RAM>\` to get an estimate.\nIf no RAM is passed, the script will assume 8GB of RAM.`);
    }
}