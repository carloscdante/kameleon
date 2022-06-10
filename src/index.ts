#!/usr/bin/env node
const yargs = require('yargs');
let pack = require('../package.json');

import { init } from './modules/init';
import * as Suite from './util/assert';

const argv = yargs
    .command('init', 'Initializes a .kameleon test folder in your project.', {})
    .command('run', 'Runs a series of tests on an API via a specified file.', {
        file: {
            description: 'The configuration file for testing. Defaults to test.yml',
            alias: 'f',
            type: 'string',
        }
    })
    .command('watch', 'Manually monitor a series of requests on an API via a specified file.', {
        file: {
            description: 'The configuration file for testing. Defaults to test.yml',
            alias: 'f',
            type: 'string',
        }
    })
    .command('gendoc', 'Generates documentation from a kameleon file', {
        file: {
            description: 'The configuration file for testing (used as an API description language). Defaults to test.yml',
            alias: 'f',
            type: 'string',
        }
    })
    .command('$0', 'Kameleon CLI', () => {}, (argv) => {
        yargs.showHelp()
    })
    .help()
    .alias('help', 'h')
    .version()
    .alias('version', 'v')
    .describe('version', 'Show version information')
    .argv;

    if (argv._.includes('run')) {
        const file = argv.file;

        Suite.resolve(file);
    }

    if (argv._.includes('watch')) {
        const file = argv.file;

        Suite.resolve('watch', file);
    }

    if (argv._.includes('gendoc')) {
        console.log(0)
    }

    if (argv._.includes('init')) {
        init();
    }
