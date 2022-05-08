/** @param {import("../.").NS } ns */

export async function main(ns) {
	var target = ns.args[0];
	var mnyThresh = ns.getServerMaxMoney(target) * 0.75;
	var secThresh = ns.getServerMinSecurityLevel(target) + 5;
	if (!ns.hasRootAccess(target)) {
		try {
			[
				["BruteSSH.exe", ns.brutessh],
				["FTPCrack.exe", ns.ftpcrack],
				["HTTPWorm.exe", ns.httpworm],
				["relaySMTP.exe", ns.relaysmtp],
				["SQLInject.exe", ns.sqlinject]
			].filter(wares => ns.fileExists(wares[0])).map(exe => {
				exe[1](target);
			});
			ns.nuke(target);
		} catch {
			ns.print(`Not enough ports for ${target.toUpperCase()}!`);
			ns.exit();
		}
	}
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