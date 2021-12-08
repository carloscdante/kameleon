// This module handles API assertions and general tests.

import * as assertTool from '../modules/eval';
import * as autorest from '../modules/api';

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
