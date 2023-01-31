/** @param {import("../.").NS } ns */

export async function main(ns) {
	ns.disableLog(`ALL`);
	ns.enableLog(`weaken`);
	ns.enableLog(`hack`);
	ns.enableLog(`grow`);
	
	const target = ns.args[0];
	const mnyThresh = ns.getServerMaxMoney(target) * 0.75;
	const secThresh = ns.getServerMinSecurityLevel(target) + 5;

	if (!ns.hasRootAccess(target)) {
		try {
			[
				["BruteSSH.exe", ns.brutessh],
				["FTPCrack.exe", ns.ftpcrack],
				["HTTPWorm.exe", ns.httpworm],
				["relaySMTP.exe", ns.relaysmtp],
				["SQLInject.exe", ns.sqlinject]
			].map(exe => {
				if (ns.fileExists(exe[0])) {
					exe[1](target);
					ns.print(`Deployed ${exe[0]} on ${target.toUpperCase()}!`)
				}
			})
			ns.nuke(target);
		} catch {
			ns.print(`\nNot enough ports for ${target.toUpperCase()}!`);
			ns.exit();
		}
	}
	// skipcq: JS-0003
	while (true) {
		if (ns.getServerSecurityLevel(target) > secThresh) {
			await ns.weaken(target);
		} else if (ns.getServerMoneyAvailable(target) < mnyThresh) {
			await ns.grow(target);
		} else {
			await ns.hack(target);
		}
	}
}