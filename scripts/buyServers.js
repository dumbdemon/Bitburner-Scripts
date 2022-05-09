/** @param {import("../.").NS } ns */

export async function main(ns) {
    const RAM = ns.args[0];
    if (!RAM) {
        ns.print("No arguement passed!");
        ns.exit();
    }
    var i = ns.getPurchasedServers().length;

    while (i < ns.getPurchasedServerLimit()) {
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(RAM)) {
            var hostname = ns.purchaseServer("bitch-" + i, RAM);
            await ns.scp("hckthat.js", hostname);
            await ns.scp("runner.js", hostname);
            ns.exec("runner.js", hostname);
        }
        ++i;
    }
}