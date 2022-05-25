import * as hlp from "./common";

/** @param {import("../.").NS } ns */
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
                        if (freeRAM < (ns.getScriptRam(hlp.hacker, source) * threads)) {
                            if (source != "home") { ns.exit() }
                            ns.tprintf(`Unable to run anymore stripts!` +
                            `\n Needed Free RAM :: ${ns.getScriptRam(hlp.hacker, source) * threads}GB` +
                            `\nCurrent Free RAM :: ${hlp.getPrettyNumber(ns, freeRAM, 1)}GB` +
                            `\nTerminating the script...`);
                            ns.exit();
                        }
                        ns.run(hlp.hacker, threads, trgt);
                        ns.print(`\nRunning "${hlp.hacker}" targeting [${trgt.toUpperCase()}] with ${threads} threads!`);
                    } catch {
                        if (freeRAM < ns.getScriptRam(hlp.hacker, source)) {
                            ns.tprintf(`Unable to run anymore stripts on [${source.toUpperCase()}]!\nNeed at least ${ns.getScriptRam(hlp.hacker, source)}GB!\nTerminating the script...`);
                            ns.exit();
                        }
                        ns.print(`\nSetting threads to 1 for [${trgt.toUpperCase()}]!`);
                        ns.run(hlp.hacker, 1, trgt);
                        ns.print(`Running "${hlp.hacker}" targeting [${trgt.toUpperCase()}]!`)
                    }
                } else {
                    if (freeRAM < ns.getScriptRam(hlp.hacker, source)) {
                        ns.tprintf(`Unable to run anymore stripts on [${source.toUpperCase()}]!\nNeed at least ${ns.getScriptRam(hlp.hacker, source)}GB!\nTerminating the script...`);
                        ns.exit();
                    }
                    ns.run(hlp.hacker, 1, trgt);
                    ns.print(`\nRunning "${hlp.hacker}" on [${source.toUpperCase()}] targeting [${trgt.toUpperCase()}]!`)
                }
            } else ns.print(`\n"${hlp.hacker}" is already targeting [${trgt.toUpperCase()}] on [${source.toUpperCase()}]!`);
        } else ns.print(`\nCan't run "${hlp.hacker}" targeting [${trgt.toUpperCase()}]!\nCurrent hacking Lvl (${myHckLvl}) is less than required hacking Lvl (${srvhckLvl})!`);
    }

    if (source == "home") {
        ns.run("srvCallRunner.js");
        ns.tail("srvCallRunner.js");
    } else ns.print(`Skipping call for "srvCallRunner.js"!`);
}