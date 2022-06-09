const chalk = require('chalk');
const figlet = require('figlet');

export function MSG_ATTRIBUTE_NOT_FOUND(attr: String, description: String){
  return `${chalk.red(`❌ Failing:

attribute `)}${chalk.white.bold(`"${attr}"`)} ${chalk.red.bold(`
not found in response data.`)}

`;
}

export function MSG_ATTRIBUTE_FOUND(attr: String, description: String){
  return `${chalk.green(`✓ Passing:

attribute `) }${chalk.white.bold(`"${attr}"`)} ${chalk.white(`
found in response data.`)}

`;
}

export function MSG_SHOW_DESCRIPTION(description: String){
  return `${chalk.italic.magenta(description)}

  `
}

export function MSG_ATTRIBUTE_FOUND_CORRECT_TYPE(attr: String, typeExpected, typeReturned, description: String){
  return `${chalk.green(`✓ Passing:

attribute `) }${chalk.white.bold(`"${attr}"`)} ${chalk.green.bold(`
found in response data and its type is ${chalk.blue.bold(typeReturned)}.

`)}`;
}

export function MSG_ATTRIBUTE_FOUND_WRONG_TYPE(attr: String, typeExpected, typeReturned, description: String){
  return `${chalk.red(`❌ Failing:

attribute `) }${chalk.white.bold(`"${attr}"`)} ${chalk.red(`
found in response data but its type is ${chalk.blue.bold(typeReturned)}, not ${chalk.blue.bold(typeExpected)}

`)}`;
}

export function MSG_STATUS_UNEXPECTED(status: Number, expectedStatus: Number, description: String){
  return `${chalk.red(`❌ Failing:

status`)} ${chalk.blue.bold(status)}
${chalk.green.bold(`not corresponding to expected status`)} ${chalk.blue.bold(expectedStatus)}

`
}

export function MSG_STATUS_EXPECTED(status: Number, expectedStatus: Number, description: String){
  return `${chalk.green(`✓ Passing:

status`)} ${chalk.white.bold(status)}
${chalk.green.bold(`corresponding to expected status`)} ${chalk.green.bold(expectedStatus)}

`
}

export function MSG_RETURN_TYPE_FAIL(returnType: any, expectedReturnType: any, description: String){
  return `${chalk.red(`❌ Failing:

returned type`)} ${chalk.blue.bold(typeof(returnType))}
${chalk.red.bold(`not corresponding to expected return type`)} ${chalk.blue.bold(expectedReturnType)}

`
}

export function MSG_RETURN_TYPE_SUCCESS(returnType: any, expectedReturnType: any, description: String){
  return `${chalk.green(`✓ Passing:

returned type`)} ${chalk.blue.bold(typeof(returnType))}
${chalk.green.bold(`corresponding to expected return type`)} ${chalk.blue.bold(expectedReturnType)}

`
}

export function MSG_INITIALIZE_ASSERT(method: String, host: String, port: Number, endpoint: String){
  if(port) return `${chalk.blue(`Initializing ${chalk.white(method.toUpperCase())} test on `)}${chalk.white(host)}:${chalk.white(port)}${chalk.white(endpoint)}...` 
  return `${chalk.blue(`Initializing ${chalk.white(method.toUpperCase())} test on `)}${chalk.white(host)}${chalk.white(endpoint)}...`
}

export function WELCOME_MESSAGE(){
  return `${figlet.textSync('Kameleon', {
    whitespaceBreak: true
})}
${chalk.white('Welcome to ')}${chalk.blue.bold('Kameleon')}${chalk.white(
    '! A folder named "Kameleon" has been created in your current working directory with sample configuration. If you want to know more about how it works, check the documentation at '
  )}${chalk.blue.bold('https://kameleon-project.org/docs')}.`
}
