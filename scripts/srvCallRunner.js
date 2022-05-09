/** @param {import("..").NS } ns */
export async function main(ns) {
    var notThese = ["home","CSEC","darkweb"];
    let testRecievers = ["home"];
    let recievers = [];
    Array(30).fill().map(y => testRecievers = [...new Set(testRecievers.map(s => [s, ns.scan(s)]).flat(2))]);
    testRecievers.map(serv =>{
        let chk = notThese.filter(server => server == serv);
        if (chk.length == 0) {
            ns.print(`${serv} pushed to recievers`)
            recievers.push(serv);
        }
    });

    var i = 0;

    while(i < recievers.length) {
        if (ns.hasRootAccess(recievers[i])) {
            let trgt = recievers[i];
            let scanRad = [trgt];
            Array(30).fill().map(y => scanRad = [...new Set(scanRad.map(s => [s, ns.scan(s)]).flat(2))]);
            scanRad.map(srv => {
                ns.kill("hckthat.js", trgt, srv);
            });
            
            ns.rm("hckthat.js", trgt);
            await ns.scp("hckthat.js", trgt);
            ns.rm("runner.js", trgt);
            await ns.scp("runner.js", trgt);

            if (ns.getServerMaxRam(trgt) > (ns.getScriptRam("runner.js", trgt) + ns.getScriptRam("hckthat.js", trgt))) {
                ns.exec("runner.js", trgt, 1, trgt);
            } else {
                ns.rm("hckthat.js", trgt);
                ns.rm("runner.js", trgt);
            }
        }
        ++i;
    }
}