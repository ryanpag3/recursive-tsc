import fs from 'fs';
import path from 'path';
import util from 'util';
import child from 'child_process';
import blacklist from './dir-blacklist.json';

const exec = util.promisify(child.exec);

export default class RecursiveTSC {
    constructor() {}

    /**
     * build all typescript projects recursively relative to the specified path.
     * @param {string} relativePath
     */
    recursiveBuildRelative (relativePath: string) {
        const absolute = path.resolve(relativePath);

        if (!fs.existsSync(absolute)) {
            console.log(`ERROR: Invalid path provided ${absolute}`);
            process.exit(1);
        }

        this.recursiveBuild(absolute);
    }

    /**
     * build all projects recursively in specified absolute path
     * @param {string} absolutePath
     */
    async recursiveBuild (absolutePath: string) {
        const tsconfPath = path.join(absolutePath, 'tsconfig.json');
        if (fs.existsSync(tsconfPath))
            await this.tsc(tsconfPath);
        
        for (let dir of this.getDirectories(absolutePath))
            await this.recursiveBuild(dir);
    }

    /**
     * build the project at the current path
     * @param {string} p the path to build in
     */
    async tsc (p: string) {
        console.log(`Compiling project ${p}`);
        const { stderr } = await exec(`tsc --p ${p}`);
        if (stderr && stderr !== '') console.log(stderr);
    }   

    /**
     * get all directories inside path, excluding node_modules
     * @param {string} p the path to get directories inside
     */
    getDirectories (p: string) {
        let dirs = fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
        dirs = dirs.filter(f => {
            for (let blacklistedDir of blacklist) {
                if (f.includes(blacklistedDir)) return false;
            };
            return true;
        });
        return dirs.map(dir => {
            return path.join(p, dir);
        })
    }
}