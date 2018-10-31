#!/usr/bin/env node

import RecursiveTSC from '../recursive-tsc';

const recursiveTSC = new RecursiveTSC();

// delete first and second argument (node dist/recursive-install.js)
const args = process.argv.splice(process.execArgv.length + 2);

if (!args[0]) {
    console.log('Path is required for recursive install. Try "recursive-tsc /path/to/directory"');
    process.exit(1);
}

const relativePath = args[0];

console.log(relativePath);

recursiveTSC.recursiveBuildRelative(relativePath);
