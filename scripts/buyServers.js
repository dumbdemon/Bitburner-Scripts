import * as hlp from "./common";

/** @param {import("../.").NS } ns */
export async function main(ns) {
    ns.tprintf(`\u00bb\u00bb ${ns.getScriptName()} [${ns.args}]`);
    const whatDo = ns.args[0];
    var RAM = ns.args[1] ?? 8;
    var oneSrvCost = ns.getPurchasedServerCost(RAM);
    var startCnt = ns.getPurchasedServers().length;
    var srvrAmt = ns.getPurchasedServerLimit() - ns.getPurchasedServers().length;
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
                    var mySrv = ns.purchaseServer(`${hlp.buySrvName}-${i}`, RAM);
                    await ns.scp(hlp.commons, mySrv);
                    await ns.scp(hlp.hacker, mySrv);
                    await ns.scp(hlp.runner, mySrv);
                    ns.exec(hlp.runner, mySrv, 1, mySrv);
                    reqMny -= oneSrvCost;
                }
                ++i;
            }
            if (reqMny > 0) {
                if (ns.getPurchasedServers().length == startCnt) { ns.tprintf(`No servers purchased!\nYou need at least $${hlp.getPrettyNumber(ns, oneSrvCost, 3)} for one server.`) }
                else ns.tprintf(`You need at least $${hlp.getPrettyNumber(ns, reqMny, 3)} to get ${ns.getPurchasedServerLimit()-ns.getPurchasedServers().length} more server(s)!`);
            }
            break;
        case "query":
            if (ns.getPurchasedServers().length == ns.getPurchasedServerLimit()) {
                ns.tprintf(`You don't need anymore servers!`);
                if (isFinite(queryMny)) {
                    ns.tprintf(`However, you will need $${hlp.getPrettyNumber(ns, queryMny, 3)} to buy ${ns.getPurchasedServerLimit()} servers with ${RAM}GB of RAM.` +
                    `\nFor at least one, you need $${hlp.getPrettyNumber(ns, oneSrvCost, 3)}.`);
                } else {
                    ns.tprintf(`However, the RAM query you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
                }
            } else if (isFinite(reqMny)) {
                ns.tprintf(`You will need $${hlp.getPrettyNumber(ns, queryMny, 3)} to buy ${ns.getPurchasedServerLimit()} servers with ${RAM}GB of RAM.` +
                `\nFor at least one, you need $${hlp.getPrettyNumber(ns, oneSrvCost, 3)}.`);
            } else {
                ns.tprintf(`The RAM query you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
            }
            break;
        default:
            ns.tprintf(`Type \`run buyServers.js buy <RAM>\` to buy servers, or type \`run buyServers.js query <RAM>\` to get an estimate.\nIf no RAM is passed, the script will assume 8GB of RAM.`);
    }
}