import * as hlp from "./common";

/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.tprintf(`\u00bb\u00bb ${ns.getScriptName()} [${ns.args}]`);
    var notThese = hlp.notMySrvs(ns, true);
    let workingList = [];
    for (let srv of hlp.getConnectedServers(ns, "home")) {
        if (!notThese.includes(srv)) {
            workingList.push(srv);
        }
    }

    let totalKilled = 0;
    for (let mkeDead of workingList) {
        if (ns.hasRootAccess(mkeDead) && (ns.getServerMaxRam(mkeDead) % 2 == 0)) {
            ns.kill(hlp.hacker, "home", mkeDead);
            ns.tprintf(`Killing ${hlp.hacker} with args [${mkeDead}]!`);
            ++totalKilled;
        }
    }
    ns.tprintf(`Killed ${totalKilled} total scipts!`);

    if (ns.args[0] == null) {
        ns.run(hlp.runner, 1);
        ns.tail(hlp.runner, "home")
        ns.tprintf(`Restarting "${hlp.hacker}" scripts!`)
    } else ns.tprintf("Skipping restart!");
}