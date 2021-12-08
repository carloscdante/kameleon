"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSG_INITIALIZE_ASSERT = exports.MSG_RETURN_TYPE_SUCCESS = exports.MSG_RETURN_TYPE_FAIL = exports.MSG_STATUS_EXPECTED = exports.MSG_STATUS_UNEXPECTED = exports.MSG_ATTRIBUTE_FOUND = exports.MSG_ATTRIBUTE_NOT_FOUND = void 0;
const chalk = require('chalk');
function MSG_ATTRIBUTE_NOT_FOUND(attr) {
    return `${chalk.red.bold(`Assertion failed: attribute`)}${attr} ${chalk.red.bold(`not found in response data.`)}`;
}
exports.MSG_ATTRIBUTE_NOT_FOUND = MSG_ATTRIBUTE_NOT_FOUND;
function MSG_ATTRIBUTE_FOUND(attr) {
    return `${chalk.green.bold(`Assertion successful: attribute`)}${attr} ${chalk.green.bold(`found in response data.`)}`;
    ;
}
exports.MSG_ATTRIBUTE_FOUND = MSG_ATTRIBUTE_FOUND;
function MSG_STATUS_UNEXPECTED(status, expectedStatus) {
    return `${chalk.red.bold(`Assertion failed: status`)} ${chalk.blue.bold(status)}
      ${chalk.green.bold(`not corresponding to expected status`)} ${chalk.blue.bold(expectedStatus)}`;
}
exports.MSG_STATUS_UNEXPECTED = MSG_STATUS_UNEXPECTED;
function MSG_STATUS_EXPECTED(status, expectedStatus) {
    return `${chalk.green.bold(`Assertion successful: status`)} ${chalk.blue.bold(status)}
      ${chalk.green.bold(`corresponding to expected status`)} ${chalk.blue.bold(expectedStatus)}`;
}
exports.MSG_STATUS_EXPECTED = MSG_STATUS_EXPECTED;
function MSG_RETURN_TYPE_FAIL(returnType, expectedReturnType) {
    return `${chalk.red.bold(`Assertion failed: returned type`)} ${chalk.blue.bold(typeof (returnType))}
      ${chalk.red.bold(`not corresponding to expected return type`)} ${chalk.blue.bold(expectedReturnType)}`;
}
exports.MSG_RETURN_TYPE_FAIL = MSG_RETURN_TYPE_FAIL;
function MSG_RETURN_TYPE_SUCCESS(returnType, expectedReturnType) {
    return `${chalk.green.bold(`Assertion successful: returned type`)} ${chalk.blue.bold(typeof (returnType))}
      ${chalk.green.bold(`corresponding to expected return type`)} ${chalk.blue.bold(expectedReturnType)}`;
}
exports.MSG_RETURN_TYPE_SUCCESS = MSG_RETURN_TYPE_SUCCESS;
function MSG_INITIALIZE_ASSERT(method, host, port, endpoint) {
    return `${chalk.blue(`Initializing ${chalk.white(method.toUpperCase())} test on `)}${chalk.white(host)}:${chalk.white(port)}${chalk.white(endpoint)}...`;
}
exports.MSG_INITIALIZE_ASSERT = MSG_INITIALIZE_ASSERT;
