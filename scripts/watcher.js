/** @param {import("../.").NS } ns */

export async function main(ns) {
    const hashes = {};
    const files = ns.ls('home', '.js');
    for (const file of files) {
        const contents = ns.read(file);
        hashes[file] = getHash(contents);
    }
	// skipcq: JS-0003
    while (true) {
        for (const file of files) {
            const contents = ns.read(file);
            const hash = getHash(contents);
            if (hash !== hashes[file]) {
                ns.tprintf(`INFO: Detected change in ${file}`);
                const processes = ns.ps().filter((p) => {
                    return p.filename === file;
                });
                for (const process of processes) {
                    ns.tprintf(`INFO: Restarting ${process.filename} ${process.args} -t ${process.threads}`);
                    if (process.filename !== ns.getScriptName()) {
                        ns.kill(process.pid);
                        ns.run(process.filename, process.threads, ...process.args);
                    }
                    else {
                        ns.spawn(process.filename, process.threads, ...process.args);
                    }
                }
                hashes[file] = hash;
            }
        }
        await ns.sleep(1000);
    }
}
function getHash(input) {
    let hash = 0;
    if (input.length === 0)
        return hash;
    for (let i = 0; i < input.length; i++) {
        const chr = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};