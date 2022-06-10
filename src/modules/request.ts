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

  axios.interceptors.request.use(function (config) {
 
    config.metadata = { startTime: new Date()}
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
 
  response.config.metadata.endTime = new Date()
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime
  return response;
}, function (error) {
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
  return Promise.reject(error);
});

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
    returnedResponse['responseTime'] = response.duration;
    callback(returnedResponse);
  })
}
