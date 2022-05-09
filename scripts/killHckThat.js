/** @param {import("..").NS } ns */
export async function main(ns) {
    let restartChk = ns.args[0];
    var notThese = [
        "home",
        "CSEC",
        "darkweb"
    ]
    ns.getPurchasedServers().forEach(async (nopes) => notThese.push(nopes));
    let q = ["home"];
    let workingList = [];
    Array(30).fill().map(y => q = [...new Set(q.map(s => [s, ns.scan(s)]).flat(2))]);
    q.forEach(srv => {
        if (!notThese.includes(srv)) {
            workingList.push(srv);
        }
    });

    workingList.map(killIt => {
        if (ns.hasRootAccess(killIt) && (ns.getServerMaxRam(killIt) % 4 == 0)) {
            ns.kill("hckthat.js", "home", killIt);
        }
    });

    if (typeof restartChk != null) {
        ns.run("runner.js");
    } else ns.print("Args is empty, skipping restart!");
}