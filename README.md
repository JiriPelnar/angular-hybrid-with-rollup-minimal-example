# angular-hybrid-with-rollup-minimal-example

This repository serves to demonstrate some incompatibility between angular-hybrid package and rollup.

To reproduce the incompatibility, follow these steps:

1) download the repository
2) run command: npm i
3) run command: "node_modules/.bin/ngc" -p tsconfig.json
4) run command: "node_modules/.bin/rollup"  -c rollup-config.js

The rollup step will fail with errors stating that angular-hybrid package cannot be resolved by node resolve plugin and other errors stating that couple of names are not exported from uirouter-core.

To make the rollup work, you can follow this answer of Radim Köhler on stack overflow: https://stackoverflow.com/a/45615758/4240307
and ucomment line 38 in rollup-config.js to put the custom plugin that correctly resolves angular-hybrid and core packages.

5) The application can then be started by running following command: npm run start
