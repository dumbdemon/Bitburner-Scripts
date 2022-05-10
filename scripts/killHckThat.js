/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);

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

    workingList.map(mkeDead => {
        if (ns.hasRootAccess(mkeDead) && (ns.getServerMaxRam(mkeDead) % 4 == 0)) {
            ns.kill("hckthat.js", "home", mkeDead);
            ns.print(`Killing "hckthat.js" with args [${mkeDead}]!`);
        }
    });

    if (restartChk == null) {
        ns.run("runner.js", 1, "null");
        ns.print(`Restarting "hckthat.js" scripts!`)
    } else ns.print("Args is empty, skipping restart!");
}