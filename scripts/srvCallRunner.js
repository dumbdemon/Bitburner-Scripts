import * as hlp from "./common";

/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);
    let recievers = [];
    for (let serv of hlp.getConnectedServers(ns, "home")) {
        if (!hlp.notMySrvs(ns, false).includes(serv) && ns.getServerMaxRam(serv) != 0) {
            recievers.push(serv);
        }
    }

    var ramMIN = ns.getScriptRam(hlp.runner, "home") + ns.getScriptRam(hlp.hacker, "home");
    ns.print(`I need at least ${ramMIN}GB of RAM on all targetable servers!\nChecking if "${hlp.runner}" can run...`)

    for (let trgt of recievers) {
        if (ns.hasRootAccess(trgt)) {
            if (ns.getServerMaxRam(trgt) > ramMIN) {
                ns.print(`Killing all scipts using "${hlp.hacker}" on [${trgt.toUpperCase()}]!`)
                for (let srv of hlp.getConnectedServers(ns, trgt)) { ns.kill(hlp.hacker, trgt, srv) }

                await ns.scp(hlp.commons, trgt);
                await ns.scp(hlp.hacker, trgt);
                await ns.scp(hlp.runner, trgt);
    
                ns.exec(hlp.runner, trgt, 1, trgt);
                ns.print(`> "${hlp.runner}" has started on [${trgt.toUpperCase()}]!`);
            } else {
                ns.print(`> Unable to run on [${trgt.toUpperCase()}]!\n> Not enough RAM!`)
            }
        } else ns.print(`No root access on [${trgt.toUpperCase()}]!`)
    }
}