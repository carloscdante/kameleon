import * as YAML from 'yaml';
var fs = require('fs');

const configPath = './autorest'

export async function parse(file){
  const parsed = YAML.parse(file);
  return parsed;
  fs.exists(configPath, (exists) => {
    fs.readFile(`${configPath}/test.yaml`, 'utf-8', (err, data) => {
      const testFile = YAML.parse(data);
    })
});
}
