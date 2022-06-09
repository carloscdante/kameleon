const axios = require('axios');

import { API, Call } from './api';

type Handler = (t) => void;

export async function send(api: API, call: Call, callback: Handler){

  let returnedResponse = {};

  const host = api.host;
  const port = api.port;
  const endpoint = call.endpoint;
  const method = call.method;
  const headers = call.headers;
  const body = call.body;
  const parameters = call.parameters;
  const https = call.https;

  let protocol = https ? 'https' : 'http';
  let url = '';
  if(port) {
    url = `${protocol}://${host}:${port}${endpoint}`;
  } else{
    url = `${protocol}://${host}${endpoint}`;
  }

  axios({
    method: method,
    url: url,
    headers: headers,
    params: parameters,
    data: body
  })
  .then(response => {
    returnedResponse['status'] = response.status;
    returnedResponse['data'] = response.data;
    callback(returnedResponse);
  })
}
