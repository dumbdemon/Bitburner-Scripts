/** @param {import("../.").NS } ns */

export async function main(ns) {
    ns.tprintf(`\u00bb\u00bb ${ns.getScriptName()} [${ns.args}]`);
    for (let server of ns.getPurchasedServers()) {
        ns.tprintf(server);
    }
}