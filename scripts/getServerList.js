/** @param {import("../.").NS } ns */

export function main(ns) {
    ns.tprintf(`\u00bb\u00bb ${ns.getScriptName()} [${ns.args}]`);
    for (const server of ns.getPurchasedServers()) {
        ns.tprintf(server);
    }
}