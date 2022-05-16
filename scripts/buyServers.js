/** @param {import("../.").NS } ns */

export async function main(ns) {
    ns.tprintf(`~~~~~${ns.getScriptName()} [${ns.args}]~~~~~`);
    const whatDo = ns.args[0];
    var RAM = ns.args[1];
    if (RAM == null) { RAM = 8 }
    var srvrAmt = ns.getPurchasedServerLimit() - ns.getPurchasedServers().length;
    var reqMny = srvrAmt * ns.getPurchasedServerCost(RAM);
    
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
                if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(RAM)) {
                    var hostname = ns.purchaseServer("bitch-" + i, RAM);
                    await ns.scp("hckthat.js", hostname);
                    await ns.scp("runner.js", hostname);
                    ns.exec("runner.js", hostname);
                }
                ++i;
                reqMny -= ns.getPurchasedServerCost(RAM);
            }
            if (reqMny > 0) { ns.tprintf(`You need at least $${reqMny} more to get ${buySrvr} more server(s)!`)}
            break;
        case "query":
            if (ns.getPurchasedServers().length == ns.getPurchasedServerLimit()) {
                ns.tprintf(`You don't need anymore servers!`);
                if (isFinite(reqMny)) {
                    ns.tprintf(`However, you will need $${(25 * ns.getPurchasedServerCost(RAM)).toLocaleString('en-US')} to buy 25 servers with ${RAM}GB of RAM.`);
                } else {
                    ns.tprintf(`However, the RAM query you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
                }
            } else if (isFinite(reqMny)) {
                ns.tprintf(`You will need $${reqMny.toLocaleString('en-US')} to buy ${srvrAmt} servers with ${RAM}GB of RAM.`);
            } else {
                ns.tprintf(`The RAM query you passed has resulted in INFINITE required money. Obviously, you don't have that!`);
            }
            break;
        default:
            ns.tprintf(`Type \`run buyServers.js buy <RAM>\` to buy servers, or type \`run buyServers.js query <RAM>\` to get an estimate.\nIf no RAM is passed, the script will assume 8GB of RAM.`);
    }
}