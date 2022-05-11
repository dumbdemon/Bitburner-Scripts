/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);

    var notThese = [
        "home",
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

    let totalKilled = 0;
    workingList.map(mkeDead => {
        if (ns.hasRootAccess(mkeDead) && (ns.getServerMaxRam(mkeDead) % 2 == 0)) {
            ns.kill("hckthat.js", "home", mkeDead);
            ns.print(`Killing "hckthat.js" with args [${mkeDead}]!`);
            ++totalKilled;
        }
    });
    ns.print(`Killed ${totalKilled} total scipts!`);

    if (ns.args[0] == null) {
        ns.run("runner.js", 1, "null");
        ns.print(`Restarting "hckthat.js" scripts!`)
    } else ns.print("Args is empty, skipping restart!");
}