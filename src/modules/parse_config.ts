import * as YAML from 'yaml';
var fs = require('fs');

const configPath = './autorest'

export async function parse(file){
  const parsed = YAML.parse(file);
  return parsed;
}

export async function parseBody(expr){
  let ret = {};
  let spl = expr.split(':');
  let pName = spl[0];
  let pType = spl[1];
  let pValue = spl[2];
  switch(pType){
    case 'string':
      pValue = pValue.toString();
      break;
    case 'number':
      pValue = parseInt(pValue);
      break;
    case 'boolean':
      pValue = !!pValue;
      break;
  }
  ret[pName] = pValue;

  return ret;
}

export async function parseDataOptions(expr){
  let ret = {};
  let spl = expr.split(':');
  let pName = spl[0];
  let pType = spl[1];
  ret[pName] = pType;

  return ret;
}

export async function parseHeaders(expr){
  let ret = {};
  let spl = expr.split(':');
  let pName = spl[0];
  let pValue = spl[1];
  ret[pName] = pValue;

  return ret;
}
