/** @param {import("../.").NS } ns */

export async function main(ns) {
    var srv = 0;

    while (srv < ns.getPurchasedServerLimit()) {
        var server = "bitch-" + srv;
        try {
            if (ns.fileExists("runner.js", server)) {
                ns.exec("runner.js", server)
            } else {
                await ns.scp("runner.js", server)
                ns.exec("runner.js", server)
            }
        } catch {
            ns.print(`${server.toUpperCase()} is not a valid server!`);
        }
        ++srv;
    }
}