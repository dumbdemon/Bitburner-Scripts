import * as hlp from "./common";

/** @param {import("../.").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);

    var notThese = hlp.notMySrvs(ns, true);
    var source = ns.args[0];
    let srvCall;
    if (!source || source == "null") {
        if (source == "null") { srvCall = 1 }
        source = "home";
    }
    ns.print(`Started with source [${source.toUpperCase()}]!`);
    let q = [];
    for (let serv of hlp.getConnectedServers(ns, source)) {
        if (!notThese.includes(serv)) {
            if (source == "home") {
                q.push(serv);
            } else {
                if ((ns.getServerMaxRam(serv) != 0)) {
                    q.push(serv);
                }
            }
        }
    }

    for (let server of q) {
        var srvhckLvl = ns.getServerRequiredHackingLevel(server);
        var myHckLvl = ns.getHackingLevel();
        if (myHckLvl >= srvhckLvl) {
            if (!ns.getRunningScript("hckthat.js", source, server)) {
                if (source == "home" || source.startsWith("bitch")) {
                    try {
                        var threads = Math.floor(ns.getServerMaxRam(server) / 2);
                        ns.run("hckthat.js", threads, server);
                        ns.print(`\nRunning "hckthat.js" targeting [${server.toUpperCase()}] with ${threads} threads!`)
                    } catch {
                        ns.print(`\nSetting threads to 1 for [${server.toUpperCase()}]!`);
                        ns.run("hckthat.js", 1, server);
                        ns.print(`Running "hckthat.js" targeting [${server.toUpperCase()}]!`)
                    }
                } else {
                    ns.run("hckthat.js", 1, server);
                    ns.print(`\nRunning "hckthat.js" on [${source.toUpperCase()}] targeting [${server.toUpperCase()}]!`)
                }
            } else ns.print(`\n"hckthat.js" is already targeting [${server.toUpperCase()}] on [${source.toUpperCase()}]!`)
        } else {
            ns.print(`\nCan't run "hckthat.js" targeting [${server.toUpperCase()}]!\nCurrent hacking Lvl (${myHckLvl}) is less than required hacking Lvl (${srvhckLvl})!`)
        }
    }

    if (!ns.getRunningScript("watcher.js", "home")) {
        ns.exec("watcher.js", "home");
    }

    if (!srvCall && source == "home") {
        ns.run("srvCallRunner.js");
        ns.tail("srvCallRunner.js");
    } else (ns.print(`Skipping call for "srvCallRunner.js"!`))
}