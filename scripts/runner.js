/** @param {import("../.").NS } ns */

export async function main(ns) {
    var notThese = [
        "home",
        "CSEC"
    ]
    ns.getPurchasedServers().forEach(async (nopes) => notThese.push(nopes));
    var target = ns.args[0];
    if (!target) {target = "home";}
    let q = [target];
    Array(30).fill().map(y => q = [...new Set(q.map(s => [s, ns.scan(s)]).flat(2))]);
    q.map(async (server) => {
        let check = 0;
        for (var i = 0; i < notThese.length; i++) {
            if (notThese[i] == server) {
                check++;
            }
        }
        if (check == 0) {
            if (ns.getServerMaxRam(server) > 0) {
                var srvhckLvl = ns.getServerRequiredHackingLevel(server);
                var myHckLvl = ns.getHackingLevel();
                if (myHckLvl >= srvhckLvl) {
                    try {
                        var threads = Math.floor(ns.getServerMaxRam(server) / 4);
                    } catch {
                        ns.print(`No RAM on ${server.toUpperCase()}!\nSetting threads to 1!`);
                        threads = 1;
                    }
                    ns.run("hckthat.js", threads, server);
                } else {
                    ns.print(`Hack Lvl {${myHckLvl}} < Required Hack Lvl {${srvhckLvl}}`)
                }
            }
        } else {ns.print(`${server.toUpperCase()} is not a valid target!`);}
    })
}