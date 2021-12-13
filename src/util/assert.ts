// This module handles API assertions and general tests.

import * as assertTool from '../modules/eval';
import * as autorest from '../modules/api';
import * as yamlActions from '../modules/parse_config';

var fs = require('fs');

const configPath = './autorest'

export async function resolve(){
  let parsedYaml = '';

  fs.exists(configPath, (exists) => {
    if(!exists){
      console.log('Error! No test directory detected in root folder. Did you run "autorest init"?');
      process.exit(0);
    }
    fs.readFile(`${configPath}/config.yml`, 'utf-8', async (err, data) => {
      try{
        parsedYaml = await yamlActions.parse(data);
        
      }catch(err){
        console.log('Error reading file! Aborting!');
        process.exit(0);
      }
    })
  });
}

export async function test(host: String, port: number, method: String, endpoint: String, returnType: String, status: number,
https: boolean, parameters?: Object, headers?: Object, body?: Object, dataOptions?: Object){
  const api = new autorest.API(host, port);
  const request = new autorest.Call(
    api,
    method,
    endpoint,
    returnType,
    status,
    https
  );
  return assertTool.assert(api, request);
}

// const conf = await yamlActions.parse(configFile);

const api = new autorest.API('localhost', 3000);
const request = new autorest.Call(
  api,
  'get',
  '/realms',
  'object',
  200,
  false
);

assertTool.assert(api, request);
