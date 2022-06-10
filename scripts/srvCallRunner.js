import * as hlp from "./common";

/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);
    let recievers = [];
    for (let serv of hlp.getConnectedServers(ns, "home", ["home"])) {
        if (ns.getServerMaxRam(serv) != 0) {
            recievers.push(serv);
        }
    }

    var ramMIN = Math.ceil(ns.getScriptRam(hlp.runner, "home") + ns.getScriptRam(hlp.hacker, "home"));
    ns.print(`I need at least ${hlp.getPrettyNumber(ns, ramMIN, 2, true)} of RAM on all targetable servers! Checking if "${hlp.runner}" can run...`)

    for (let trgt of recievers) {
        if (ns.hasRootAccess(trgt)) {
            if (ns.getServerMaxRam(trgt) > ramMIN) {
                ns.print(`Killing all scipts using "${hlp.hacker}" on [${trgt.toUpperCase()}]!`)
                for (let srv of hlp.getConnectedServers(ns, trgt)) { ns.kill(hlp.hacker, trgt, srv) }

                await ns.scp(hlp.commons, trgt);
                await ns.scp(hlp.hacker, trgt);
                await ns.scp(hlp.runner, trgt);
    
                ns.exec(hlp.runner, trgt, 1, trgt);
                ns.print(`\u00bb "${hlp.runner}" has started on [${trgt.toUpperCase()}]!`);
            } else {
                ns.print(`Unable to run on [${trgt.toUpperCase()}]!\n\u00bb Not enough RAM!`)
            }
        } else ns.print(`No root access on [${trgt.toUpperCase()}]!`)
    }
}