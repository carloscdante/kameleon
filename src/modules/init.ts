// Initializes autorest, looks for config file if there is any
var fs = require('fs');
var path = require('path');

import {WELCOME_MESSAGE} from '../misc/messages'

const directory = path.join(process.cwd(), '.kameleon');
const fileNames = ['test'];
const testSample = fs.readFileSync('../../samples/config.yaml');

export async function checkConfig(){
  console.log("Initializing Kameleon in your project folder...")
  fs.exists(directory, (exists) => {
    if(!exists){
      fs.mkdir(directory, (err) => {
        if (err) {
            return console.error(err);
        }
        let createdDir = path.join(process.cwd(), '/./.kameleon/');

        fileNames.forEach(file => {
          let content = ''
          switch(file){
            case 'config':
              content = 'CONFIG FILE'
              break;
            case 'test':
              content = '# Welcome to Kameleon! Check the documentation to learn how to write test files.'
              break;
          }
          fs.open(`${createdDir}${file}.yml`, 'wx', async(err, desc) => {
          if(!err && desc) {
             fs.writeFile(desc, content, (err) => {
               if (err) throw err;
             })
          }
          })
        })
      });
    } else{
      throw new Error('Test folder already found. If you want to wipe it, you should run the command "autorest clean".');
    }
  });
}

export async function init(){
  try{
    await checkConfig();
    console.log(WELCOME_MESSAGE());
  }catch(err){console.log(err)}
}
