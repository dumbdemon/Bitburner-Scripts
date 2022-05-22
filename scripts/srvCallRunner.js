import { getConnectedServers } from "./common";

/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);
    var notThese = ["home","darkweb"];
    let recievers = [];
    for (let serv of getConnectedServers(ns, ["home"])) {
        if (!notThese.includes(serv) && ns.getServerMaxRam(serv) != 0) {
            recievers.push(serv);
        }
    }

    var ramMIN = ns.getScriptRam("runner.js", "home") + ns.getScriptRam("hckthat.js", "home");
    ns.print(`I need at least ${ramMIN}GB of RAM on all targetable servers!\nChecking if "runner.js" can run...`)

    for (let trgt of recievers) {
        if (ns.hasRootAccess(trgt)) {
            if (ns.getServerMaxRam(trgt) > ramMIN) {
                ns.print(`Killing all scipts using "hckthat.js" on [${trgt.toUpperCase()}]!`)
                for (let srv of getConnectedServers(ns, [trgt])) {
                    ns.kill("hckthat.js", trgt, srv);
                }

                ns.rm("common.js", trgt);
                await ns.scp("common.js", trgt);
                ns.rm("hckthat.js", trgt);
                await ns.scp("hckthat.js", trgt);
                ns.rm("runner.js", trgt);
                await ns.scp("runner.js", trgt);
    
                ns.exec("runner.js", trgt, 1, trgt);
                ns.print(`> "runner.js" has started on [${trgt.toUpperCase()}]!`);
            } else {
                ns.print(`> Unable to run on [${trgt.toUpperCase()}]!\n> Not enough RAM!`)
            }
        } else ns.print(`No root access on [${trgt.toUpperCase()}]!`)
    }
}