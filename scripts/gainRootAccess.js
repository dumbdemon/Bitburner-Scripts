/** @param { import("../.").NS } ns */
export function main(ns) {
    ns.disableLog(`ALL`);
	
	const target = ns.args[0];
    try {
        // skipcq: JS-D008
        [
            ["BruteSSH.exe", ns.brutessh],
            ["FTPCrack.exe", ns.ftpcrack],
            ["HTTPWorm.exe", ns.httpworm],
            ["relaySMTP.exe", ns.relaysmtp],
            ["SQLInject.exe", ns.sqlinject]
        ].forEach(exe => {
            if (ns.fileExists(exe[0])) {
                exe[1](target);
                ns.print(`Deployed [${exe[0]}] on ${target.toUpperCase()}!`);
            }
        })
        ns.nuke(target);
        ns.printf(`Gained root acces to [${target.toUpperCase()}]!`);
    } catch {
        ns.print(`Not enough ports for ${target.toUpperCase()}!`);
        ns.printf(`Unable to obtain root acces to [${target.toUpperCase()}]!`);
    }
}