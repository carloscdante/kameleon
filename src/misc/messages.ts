const chalk = require('chalk');

export function MSG_ATTRIBUTE_NOT_FOUND(attr: String){
  return `${chalk.red.bold(`Assertion failed: attribute `)}${chalk.white.bold(`"${attr}"`)} ${chalk.red.bold(`
not found in response data.`)}`;
}

export function MSG_ATTRIBUTE_FOUND(attr: String){
  return `${chalk.green.bold(`Assertion successful: attribute `) }${chalk.white.bold(`"${attr}"`)} ${chalk.green.bold(`
found in response data.`)}`;
}

export function MSG_ATTRIBUTE_FOUND_WRONG_TYPE(attr: String, typeExpected, typeReturned){
  return `${chalk.green.bold(`Assertion successful: attribute `) }${chalk.white.bold(`"${attr}"`)} ${chalk.green.bold(`
found in response data and its type is ${typeReturned}.`)}`;
}

export function MSG_ATTRIBUTE_FOUND_CORRECT_TYPE(attr: String, typeExpected, typeReturned){
  return `${chalk.red.bold(`Assertion failed: attribute `) }${chalk.white.bold(`"${attr}"`)} ${chalk.red.bold(`
found in response data but its type is ${typeReturned}, not ${typeExpected}`)}`;
}

export function MSG_STATUS_UNEXPECTED(status: Number, expectedStatus: Number){
  return `${chalk.red.bold(`Assertion failed: status`)} ${chalk.blue.bold(status)}
${chalk.green.bold(`not corresponding to expected status`)} ${chalk.blue.bold(expectedStatus)}`
}

export function MSG_STATUS_EXPECTED(status: Number, expectedStatus: Number){
  return `${chalk.green.bold(`Assertion successful: status`)} ${chalk.blue.bold(status)}
${chalk.green.bold(`corresponding to expected status`)} ${chalk.blue.bold(expectedStatus)}`
}

export function MSG_RETURN_TYPE_FAIL(returnType: any, expectedReturnType: any){
  return `${chalk.red.bold(`Assertion failed: returned type`)} ${chalk.blue.bold(typeof(returnType))}
${chalk.red.bold(`not corresponding to expected return type`)} ${chalk.blue.bold(expectedReturnType)}`
}

export function MSG_RETURN_TYPE_SUCCESS(returnType: any, expectedReturnType: any){
  return `${chalk.green.bold(`Assertion successful: returned type`)} ${chalk.blue.bold(typeof(returnType))}
${chalk.green.bold(`corresponding to expected return type`)} ${chalk.blue.bold(expectedReturnType)}`
}

export function MSG_INITIALIZE_ASSERT(method: String, host: String, port: Number, endpoint: String){
  return `${chalk.blue(`Initializing ${chalk.white(method.toUpperCase())} test on `)}${chalk.white(host)}:${chalk.white(port)}${chalk.white(endpoint)}...`
}

export function WELCOME_MESSAGE(){
  return `${chalk.white('Welcome to ')}${chalk.blue.bold('Kameleon')}${chalk.white(
    '! A folder named "Kameleon" has been created in your current working directory with sample configuration. If you want to know more about how it works, check the documentation at '
  )}${chalk.blue.bold('https://kameleon-project.org/docs')}.`
}
