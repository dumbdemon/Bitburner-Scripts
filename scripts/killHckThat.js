import * as hlp from "./common";

/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.tprintf(`~~~~~${ns.getScriptName()} [${ns.args}]~~~~~`);
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
            ns.kill("hckthat.js", "home", mkeDead);
            ns.tprintf(`Killing "hckthat.js" with args [${mkeDead}]!`);
            ++totalKilled;
        }
    }
    ns.tprintf(`Killed ${totalKilled} total scipts!`);

    if (ns.args[0] == null) {
        ns.run("runner.js", 1, "null");
        ns.tprintf(`Restarting "hckthat.js" scripts!`)
    } else ns.tprintf("Skipping restart!");
}