import {getConnectedServers, hacker, runner} from "./common";

/** @param {import("..").NS } ns */
export function main(ns) {
    ns.tprintf(`\u00bb\u00bb ${ns.getScriptName()} [${ns.args}]`);
    const workingList = getConnectedServers(ns, "home", ["home"]);

    let totalKilled = 0;
    for (const mkeDead of workingList) {
        if (ns.hasRootAccess(mkeDead) && (ns.getServerMaxRam(mkeDead) % 2 === 0)) {
            ns.kill(hacker, "home", mkeDead);
            ns.tprintf(`Killing ${hacker} with args [${mkeDead}]!`);
            ++totalKilled;
        }
    }
    ns.tprintf(`Killed ${totalKilled} total scipts!`);

    if (ns.args[0] === null) {
        ns.run(runner, 1);
        ns.tail(runner, "home")
        ns.tprintf(`Restarting "${hacker}" scripts!`)
    } else ns.tprintf("Skipping restart!");
}