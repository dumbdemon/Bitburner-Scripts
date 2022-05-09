/** @param {import("../.").NS } ns */

export async function main(ns) {
    var notThese = [
        "home",
        "CSEC",
        "darkweb"
    ]
    ns.getPurchasedServers().forEach(async (nopes) => notThese.push(nopes));
    var source = ns.args[0];
    if (!source) {source = "home"}
    ns.print(`Started with source ${source}!`);
    let q = [source];
    Array(30).fill().map(y => q = [...new Set(q.map(s => [s, ns.scan(s)]).flat(2))]);
    q.map(server => {
        let check = 0;
        for (var i = 0; i < notThese.length; i++) {
            if (notThese[i] == server) {
                check++;
            }
        }
        if (check == 0) {
            var srvhckLvl = ns.getServerRequiredHackingLevel(server);
            var myHckLvl = ns.getHackingLevel();
            if (myHckLvl >= srvhckLvl) {
                if (source == "home") {
                    try {
                        var threads = Math.floor(ns.getServerMaxRam(server) / 4);
                        ns.run("hckthat.js", threads, server);
                    } catch {
                        ns.print(`No RAM on ${server.toUpperCase()}!\nSetting threads to 1!`);
                        ns.run("hckthat.js", 1, server);
                    }
                } else {
                    ns.run("hckthat.js", 1, server);
                }
            } else {
                ns.print(`Hack Lvl {${myHckLvl}} < Required Hack Lvl {${srvhckLvl}}`)
            }
        } else { ns.print(`${server.toUpperCase()} is not a valid target!`); }
    })

    ns.run("srvCallRunner.js");
}