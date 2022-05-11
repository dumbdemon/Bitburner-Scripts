/** @param {import("..").NS } ns */
export async function main(ns) {
    ns.disableLog(`ALL`);
    var notThese = ["home","darkweb"];
    let testRecievers = ["home"];
    let recievers = [];
    Array(30).fill().map(y => testRecievers = [...new Set(testRecievers.map(s => [s, ns.scan(s)]).flat(2))]);
    testRecievers.map(serv =>{
        let chk = notThese.filter(server => server == serv);
        if (chk.length == 0 && (ns.getServerMaxRam(serv) != 0)) {
            recievers.push(serv);
        }
    });

    var i = 0;
    ns.print(`I need at least ${ns.getScriptRam("runner.js", "home") + ns.getScriptRam("hckthat.js", "home")}GB of RAM on all targetable servers!\nChecking if "runner.js" can run...`)

    while(i < recievers.length) {
        let srvRAM = ns.getServerMaxRam(recievers[i]);
        let trgt = recievers[i];
        let scanRad = [trgt];

        if (ns.hasRootAccess(trgt)) {W
            if (srvRAM > (ns.getScriptRam("runner.js", "home") + ns.getScriptRam("hckthat.js", "home"))) {
                Array(30).fill().map(y => scanRad = [...new Set(scanRad.map(s => [s, ns.scan(s)]).flat(2))]);
                ns.print(`..Killing all scipts using "hckthat.js" on [${trgt.toUpperCase()}]!`)
                scanRad.map(srv => {
                    ns.kill("hckthat.js", trgt, srv);
                });

                ns.rm("hckthat.js", trgt);
                await ns.scp("hckthat.js", trgt);
                ns.rm("runner.js", trgt);
                await ns.scp("runner.js", trgt);
    
                ns.exec("runner.js", trgt, 1, trgt);
                ns.print(`.."runner.js" has started on [${trgt.toUpperCase()}]!`);
            } else {
                ns.print(`..Unable to run on [${trgt.toUpperCase()}]!\n..Not enough RAM!`)
            }
        } else ns.print(`.No root access on [${trgt.toUpperCase()}]!`)
        ++i;
    }
}