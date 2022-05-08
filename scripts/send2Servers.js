/** @param {import("../.").NS } ns */
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

    ns.print(`The length of reviecers is ${recievers.length}!`);

    var i = 0;

    while(i < recievers.length) {
        var trgt = recievers[i];
        if (ns.hasRootAccess(trgt)) {
            ns.kill("hckthat.js", trgt);
    
            if (!ns.fileExists("hckthat.js", trgt)) {
                await ns.scp("hckthat.js", trgt);
            } else {
                ns.rm("hckthat.js", trgt);
                await ns.scp("hckthat.js", trgt);
            }
    
            if (!ns.fileExists("runner.js", trgt)) {
                await ns.scp("runner.js", trgt);
            } else {
                ns.rm("runner.js", trgt);
                await ns.scp("runner.js", trgt);
            }
    
            ns.exec("runner.js", trgt, 1, trgt);
        }
        ++i;
    }
}