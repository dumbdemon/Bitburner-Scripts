import * as hlp from "./common";

/** @param { import("../.").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);

    if (!ns.isRunning("watcher.js", "home")) {
        ns.exec("watcher.js", "home");
        ns.tprintf(`Running "watcher.js"!`)
    }

    var notThese = hlp.notMySrvs(ns, true);
    var source = ns.args[0] ?? "home";
    ns.print(`Started with source [${source.toUpperCase()}]!`);
    let trgts = [];
    for (let serv of hlp.getConnectedServers(ns, source)) {
        if (!notThese.includes(serv)) {
            if (source == "home") {
                trgts.push(serv);
            } else {
                if ((ns.getServerMaxRam(serv) != 0)) {
                    trgts.push(serv);
                }
            }
        }
    }

    for (let trgt of trgts) {
        var srvhckLvl = ns.getServerRequiredHackingLevel(trgt);
        var myHckLvl = ns.getHackingLevel();
        let freeRAM = ns.getServerMaxRam(source) - ns.getServerUsedRam(source);

        if (myHckLvl >= srvhckLvl) {
            if (!ns.getRunningScript(hlp.hacker, source, trgt)) {
                if (source == "home" || source.startsWith(hlp.buySrvName)) {
                    try {
                        var threads = Math.floor(ns.getServerMaxRam(trgt) / 2);
                        if (freeRAM > (ns.getScriptRam(hlp.hacker, source) * threads)) {
                            ns.run(hlp.hacker, threads, trgt);
                            ns.print(`\nRunning "${hlp.hacker}" targeting [${trgt.toUpperCase()}] with ${threads} threads!`);
                        } else ns.print(`\nCan't run "${hlp.hacker}" targeting [${trgt.toUpperCase()}]!` +
                                `\nNot enough free RAM!` +
                                `\nNeeded ${ns.getScriptRam(hlp.hacker, source) * threads}GB/Have ${hlp.getPrettyNumber(ns, freeRAM, 1)}GB`);
                } catch {
                        if (freeRAM > ns.getScriptRam(hlp.hacker, source)) {
                            ns.print(`\nSetting threads to 1 for [${trgt.toUpperCase()}]!`);
                            ns.run(hlp.hacker, 1, trgt);
                            ns.print(`Running "${hlp.hacker}" targeting [${trgt.toUpperCase()}]!`)
                        } else ns.print(`\nCan't run "${hlp.hacker}" targeting [${trgt.toUpperCase()}]!` +
                                `\nNot enough free RAM!` +
                                `\nNeeded ${ns.getScriptRam(hlp.hacker, source)}GB/Have ${hlp.getPrettyNumber(ns, freeRAM, 1)}GB`);
                    }
                } else {
                    if (freeRAM > ns.getScriptRam(hlp.hacker, source)) {
                        ns.run(hlp.hacker, 1, trgt);
                        ns.print(`\nRunning "${hlp.hacker}" on [${source.toUpperCase()}] targeting [${trgt.toUpperCase()}]!`)
                    } else ns.print(`\nCan't run "${hlp.hacker}" targeting [${trgt.toUpperCase()}]!\nNot enough free RAM!`);
                }
            } else ns.print(`\n"${hlp.hacker}" is already targeting [${trgt.toUpperCase()}] on [${source.toUpperCase()}]!`);
        } else ns.print(`\nCan't run "${hlp.hacker}" targeting [${trgt.toUpperCase()}]!\nCurrent hacking Lvl (${myHckLvl}) is less than required hacking Lvl (${srvhckLvl})!`);
    }

    if (source == "home") {
        ns.print(`\nStarting "srvCallRunner.js"...`)
        ns.run("srvCallRunner.js");
        ns.tail("srvCallRunner.js");
    } else ns.print(`Skipping call for "srvCallRunner.js"!`);
}