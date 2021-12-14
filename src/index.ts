#!/usr/bin/env node
const yargs = require('yargs');
let pack = require('./pack.json')

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
    .option('version', {
        alias: 'v',
        description: 'Show the version'
    })
    .help()
    .alias('help', 'h')
    .argv;

    if(argv.version){
        let version = pack.version
        //console.log('Yankit v' + version)
    }

    if (argv._.includes('run')) {
        const file = argv.file;

        Suite.resolve(file);
    }

    if (argv._.includes('gendoc')) {
        console.log(0)
    }

    if (argv._.includes('init')) {
        init();
    }
