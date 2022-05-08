/** @param {import("../.").NS } ns */

export async function main(ns) {
    ns.getPurchasedServers().forEach(server => {
        ns.print(server);
    });
}