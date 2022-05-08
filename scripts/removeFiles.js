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
        ns.killall(recievers[i], true);
        ns.rm("hckthat.js", recievers[i]);
        ns.rm("runner.js", recievers[i]);
        ++i;
    }
    ns.run("send2Servers.js")
}