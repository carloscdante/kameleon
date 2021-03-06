// This module handles API assertions and general tests.

import * as assertTool from '../modules/eval';
import * as autorest from '../modules/api';
import * as yamlActions from '../modules/parse_config';

var fs = require('fs');
var path = require('path');

const configPath = path.join(process.cwd(), '.kameleon');

export async function resolve(mode?, file?){
  let pathToFile = '';
  if(file){
    pathToFile = file;
  } else{
    pathToFile = `${configPath}/test.yml`;
  }
  fs.exists(configPath, (exists) => {
    if(!exists){
      console.log('Error! No test directory detected in root folder. Did you run "kameleon init"?');
      process.exit(0);
    }
    fs.readFile(pathToFile, 'utf-8', async (err, data) => {
      try{
        let host = '';
        let port = 0;
        const parsedYaml = await yamlActions.parse(data);
        const spl = parsedYaml['host'].split(':');
        const delay = parsedYaml['delay'];
        host = spl[0];
        port = parseInt(spl[1]);
        Object.keys(parsedYaml.routes).forEach(async route => {
          let requestObjectByRoute = parsedYaml['routes'][route];
          Object.keys(requestObjectByRoute).forEach(async method => {
            const requestObjectByMethod = parsedYaml['routes'][route][method];
            const returnType = requestObjectByMethod['return_type'];
            const description = requestObjectByMethod['description'];
            const status = parseInt(requestObjectByMethod['status']);
            const https = requestObjectByMethod['ssl'];
            const timeLimit = requestObjectByMethod['time_limit'];
            const dataOptions = requestObjectByMethod['data_expected'];
            const parameters = requestObjectByMethod['parameters'] ? requestObjectByMethod['parameters'] : '';
            const headers = requestObjectByMethod['headers'];
            const body = requestObjectByMethod['body'] ? await yamlActions.parseBody(requestObjectByMethod['body']) : '';
              await test(host, port, method, route, returnType, status, https, parameters,
              headers, body, dataOptions, description, timeLimit, delay);
          })
        })
      }catch(err){
        console.log('Error reading file! Aborting!');
        process.exit(0);
      }
    })
  });
}

export async function test(host: String, port: number, method: String, endpoint: String, returnType: String, status: number,
https: boolean, parameters?: Object, headers?: Object, body?: Object, dataOptions?: Object, description?: String, timeLimit?: String,
delay?: number,){
  const api = new autorest.API(host, port);
  const request = new autorest.Call(
    api,
    method,
    endpoint,
    returnType,
    status,
    https,
    parameters,
    headers,
    body,
    dataOptions,
    description,
    timeLimit,
  );
  return assertTool.assert(api, request, delay);
}

// const conf = await yamlActions.parse(configFile);

// const api = new autorest.API('localhost', 3000);
// const request = new autorest.Call(
//   api,
//   'get',
//   '/realms',
//   'array',
//   200,
//   false
// );
//
// assertTool.assert(api, request);
