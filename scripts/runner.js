/** @param {import("../.").NS } ns */

export async function main(ns) {
    ns.disableLog(`ALL`);

    var notThese = [
        "home",
        "darkweb"
    ]
    ns.getPurchasedServers().forEach(async (nopes) => notThese.push(nopes));
    var source = ns.args[0];
    let srvCall;
    if (!source || source == "null") {
        if (source == "null") { srvCall = 1 }
        source = "home";
    }
    ns.print(`Started with source [${source.toUpperCase()}]!`);
    let tq = [source];
    let q = [];
    Array(30).fill().map(y => tq = [...new Set(tq.map(s => [s, ns.scan(s)]).flat(2))]);
    tq.map(serv => {
        let chk = notThese.filter(server => server == serv);
        if (chk.length == 0) {
            if (source == "home") {
                q.push(serv);
            } else {
                if ((ns.getServerMaxRam(serv) != 0)) {
                    q.push(serv);
                }
            }
        }
    });

    q.map(server => {
        var srvhckLvl = ns.getServerRequiredHackingLevel(server);
        var myHckLvl = ns.getHackingLevel();
        if (myHckLvl >= srvhckLvl) {
            if (source == "home") {
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
        } else {
            ns.print(`\nCan't run "hckthat.js" targeting [${server.toUpperCase()}]!\nCurrent hacking Lvl (${myHckLvl}) is less than required hacking Lvl (${srvhckLvl})!`)
        }
    })

    if (!srvCall) { ns.run("srvCallRunner.js") } else (ns.print(`Skipping call for "srvCallRunner.js"!`))
}