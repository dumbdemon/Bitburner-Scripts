import {hacker, commons, buySrvName, runner} from "./common";

/** @param {import("../.").NS } ns */
export function main(ns) {
    ns.tprintf(`\u00bb\u00bb ${ns.getScriptName()} [${ns.args}]`);
    const whatDo = ns.args[0];
    const RAM = ns.args[1] ?? 8;
    const oneSrvCost = ns.getPurchasedServerCost(RAM);
    const startCnt = ns.getPurchasedServers().length;
    const srvrAmt = ns.getPurchasedServerLimit() - ns.getPurchasedServers().length;
    let reqMny = srvrAmt * oneSrvCost;
    let queryMny = ns.getPurchasedServerLimit() * oneSrvCost;
    
    switch (whatDo) {
        case "buy": {
            let i = startCnt;
            if (!isFinite(reqMny)) {
                ns.tprintf(`The RAM you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
                ns.exit();
            } else if (startCnt === ns.getPurchasedServerLimit()) {
                ns.tprintf(`You don't need anymore servers!`);
                ns.exit();
            }
            while (i < ns.getPurchasedServerLimit()) {
                if (ns.getServerMoneyAvailable("home") > oneSrvCost) {
                    const mySrv = ns.purchaseServer(`${buySrvName}-${i}`, RAM);
                    ns.scp(commons, mySrv);
                    ns.scp(hacker, mySrv);
                    ns.scp(runner, mySrv);
                    ns.exec(runner, mySrv, 1, mySrv);
                    reqMny -= oneSrvCost;
                }
                ++i;
            }
            if (reqMny > 0) {
                const amtMore = ns.getPurchasedServerLimit() - ns.getPurchasedServers().length;
                if (ns.getPurchasedServers().length === startCnt) ns.tprintf(`No servers purchased!\nYou need at least ${ns.nFormat(oneSrvCost, "$0.000a")} for one server.`)
                else ns.tprintf(`You need at least ${ns.nFormat(reqMny, "$0.000a")} to get ${amtMore === 1 ? "one" : amtMore} more server${amtMore === 1 ? "!" : "s!" }`);
            }
            break;
        }
        case "query": {
            if (ns.getPurchasedServers().length === ns.getPurchasedServerLimit()) {
                ns.tprintf(`You don't need anymore servers!`);
                if (isFinite(queryMny)) {
                    ns.tprintf(`However, you will need ${ns.nFormat(queryMny, "$0.000a")} to buy ${ns.getPurchasedServerLimit()} servers with ${ns.nFormat(RAM * 1e6, "0.00b")} of RAM\nFor at least one, you need ${ns.nFormat(oneSrvCost, "$0.000a")}.`);
                } else {
                    ns.tprintf(`However, the RAM query you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
                }
            } else if (isFinite(reqMny)) {
                queryMny -= (ns.getPurchasedServerCost(RAM) * startCnt);
                ns.tprintf(`You will need ${ns.nFormat(queryMny, "$0.000a")} to buy ${ns.getPurchasedServerLimit() - startCnt} servers with ${ns.nFormat(RAM * 1e6, "0.00b")} of RAM.\nFor at least one, you need ${ns.nFormat(oneSrvCost, "$0.000a")}.`);
            } else {
                ns.tprintf(`The RAM query you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
            }
            break;
        }
        default: {
            ns.tprintf(`Type \`run buyServers.js buy <RAM>\` to buy servers, or type \`run buyServers.js query <RAM>\` to get an estimate.\nIf no RAM is passed, the script will assume 8GB of RAM.`);
        }
    }
}