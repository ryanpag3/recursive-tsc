# recursive-tsc
This is a small cli tool for recursively compiling typescript projects within a directory.

## Installation
Install with `npm i -g recursive-tsc`

or with yarn `yarn global add recursive-tsc`

## How to use
Simple provide the path of the parent directory containing multiple `tsconfig.json` files nested inside of it. 

For example `recursive-tsc ./` will compile all projects relative to the current directory.