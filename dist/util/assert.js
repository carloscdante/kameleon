"use strict";
// This module handles API assertions and general tests.
Object.defineProperty(exports, "__esModule", { value: true });
const assertTool = require("../modules/eval");
const autorest = require("../modules/api");
const api = new autorest.API('localhost', 3000);
const request = new autorest.Call(api, 'get', '/realms', 'object', 200, false);
assertTool.assert(api, request);
