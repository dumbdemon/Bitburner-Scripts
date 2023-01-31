import {getConnectedServers, runner, hacker, commons} from "./common";

/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);
    const recievers = [];
    for (const serv of getConnectedServers(ns, "home", ["home"])) {
        if (ns.getServerMaxRam(serv) !== 0) {
            recievers.push(serv);
        }
    }

    var ramMIN = Math.ceil(ns.getScriptRam(runner, "home") + ns.getScriptRam(hacker, "home")) * 1e9;
    ns.print(`I need at least ${ns.nFormat(ramMIN, "0.00b")} of RAM on all targetable servers! Checking if "${runner}" can run...`)

    for (const trgt of recievers) {
        if (ns.hasRootAccess(trgt)) {
            if (ns.getServerMaxRam(trgt) > ramMIN) {
                ns.print(`Killing all scipts using "${hacker}" on [${trgt.toUpperCase()}]!`)
                for (const srv of getConnectedServers(ns, trgt)) { ns.kill(hacker, trgt, srv) }

                ns.scp(commons, trgt);
                ns.scp(hacker, trgt);
                ns.scp(runner, trgt);
    
                ns.exec(runner, trgt, 1, trgt);
                ns.print(`\u00bb "${runner}" has started on [${trgt.toUpperCase()}]!`);
            } else {
                ns.print(`Unable to run on [${trgt.toUpperCase()}]!\n\u00bb Not enough RAM!`)
            }
        } else ns.print(`No root access on [${trgt.toUpperCase()}]!`)
    }
}