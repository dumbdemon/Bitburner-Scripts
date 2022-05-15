/** @param {import("../.").NS } ns */

export async function main(ns) {
    var argz;
    if (ns.args.length != 0) { argz = `[${ns.args.toString()}]` } else { argz = "[]" }
    ns.tprintf(`~~~~~${ns.getScriptName()} ${argz}~~~~~`);
    ns.getPurchasedServers().forEach(server => {
        ns.tprintf(server);
    });
}