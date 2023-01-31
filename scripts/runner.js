import {hacker, buySrvName, getConnectedServers} from "./common";

/** @param { import("../.").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);

    if (!ns.isRunning("watcher.js", "home")) {
        ns.exec("watcher.js", "home");
        ns.tprintf(`Running "watcher.js"!`)
    }

    var source = ns.args[0] ?? "home";
    ns.print(`Started with source [${source.toUpperCase()}]!`);
    const trgts = [];
    for (const serv of getConnectedServers(ns, source, ["home"], true)) {
        if (source === "home") {
            trgts.push(serv);
        } else {
            if (ns.getServerMaxRam(serv) !== 0) {
                trgts.push(serv);
            }
        }
    }

    if (source === "home" && ns.ps("home").length === trgts.length + 2) {
        ns.print(`Already hacking everything!\nSkipping remaining script and starting "srvCallRunner.js"...`)
        ns.exec("srvCallRunner.js", "home");
        ns.tail("srvCallRunner.js");
        ns.exit();
    }

    for (const trgt of trgts) {
        const srvhckLvl = ns.getServerRequiredHackingLevel(trgt);
        const myHckLvl = ns.getHackingLevel();
        const freeRAM = (ns.getServerMaxRam(source) - ns.getServerUsedRam(source)) * 1e6;
        const hackerRAM = ns.getScriptRam(hacker, source) * threads * 1e6;

        if (myHckLvl >= srvhckLvl) {
            if (!ns.getRunningScript(hacker, source, trgt)) {
                if (source === "home" || source.startsWith(buySrvName)) {
                    try {
                        var threads = Math.floor(ns.getServerMaxRam(trgt) / 2);
                        if (freeRAM > (ns.getScriptRam(hacker, source) * threads)) {
                            ns.run(hacker, threads, trgt);
                            ns.print(`\nRunning "${hacker}" targeting [${trgt.toUpperCase()}] with ${threads} threads!`);
                        } else {
                            ns.print(`\nCan't run "${hacker}" targeting [${trgt.toUpperCase()}]!\nNot enough free RAM!\nNeeded ${ns.nFormat(hackerRAM, "0.00b")}/Have ${ns.nFormat(freeRAM, "0.00b")}`);
                            if (!ns.hasRootAccess(trgt)) {
                                ns.print(`\nAttempting to gain root access anyway`);
                                ns.exec("gainRootAccess.js", "home", 1, trgt);
                                ns.asleep(3000);
                            }
                        }
                    } catch {
                        if (freeRAM > ns.getScriptRam(hacker, source)) {
                            ns.print(`\nSetting threads to 1 for [${trgt.toUpperCase()}]!`);
                            ns.run(hacker, 1, trgt);
                            ns.print(`Running "${hacker}" targeting [${trgt.toUpperCase()}]!`)
                        } else {
                            ns.print(`\nCan't run "${hacker}" targeting [${trgt.toUpperCase()}]!\nNot enough free RAM!\nNeeded ${ns.nFormat(hackerRAM, "0.00b")}/Have ${ns.nFormat(freeRAM, "0.00b")}`);
                            if (!ns.hasRootAccess(trgt)) {
                                ns.print(`\nAttempting to gain root access anyway`);
                                ns.exec("gainRootAccess.js", "home", 1, trgt);
                                ns.asleep(3000);
                            }
                        }
                    }
                } else {
                    if (freeRAM > ns.getScriptRam(hacker, source)) {
                        ns.run(hacker, 1, trgt);
                        ns.print(`\nRunning "${hacker}" on [${source.toUpperCase()}] targeting [${trgt.toUpperCase()}]!`)
                    } else {
                        ns.print(`\nCan no longer target [${source.toUpperCase()}]!\nNot enough free RAM!\nExiting...`);
                        ns.exit();
                    }
                }
            } else ns.print(`\n"${hacker}" is already targeting [${trgt.toUpperCase()}] on [${source.toUpperCase()}]!`);
        } else ns.print(`\nCan't run "${hacker}" targeting [${trgt.toUpperCase()}]!\nCurrent hacking Lvl (${myHckLvl}) is less than required hacking Lvl (${srvhckLvl})!`);
    }

    if (source === "home") {
        ns.print(`\nStarting "srvCallRunner.js"...`)
        ns.asleep(3000);
        ns.spawn("srvCallRunner.js");
    }
}