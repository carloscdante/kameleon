import * as request from './request';
import { API, Call } from './api';

import {MSG_ATTRIBUTE_FOUND, MSG_STATUS_EXPECTED,
        MSG_RETURN_TYPE_FAIL, MSG_STATUS_UNEXPECTED,
        MSG_ATTRIBUTE_NOT_FOUND, MSG_RETURN_TYPE_SUCCESS,
        MSG_INITIALIZE_ASSERT, MSG_ATTRIBUTE_FOUND_WRONG_TYPE,
        MSG_ATTRIBUTE_FOUND_CORRECT_TYPE, MSG_SHOW_DESCRIPTION,
        MSG_RESPONSE_TIME_FAIL, MSG_RESPONSE_TIME_SUCCESS} from '../misc/messages';

async function check(response, endpoint, expectedValues, description){
  try {
    console.log(MSG_SHOW_DESCRIPTION(description));
    if(parseInt(expectedValues.timeLimit) < response.responseTime) {
      console.log(MSG_RESPONSE_TIME_FAIL(expectedValues.timeLimit, response.responseTime));
    } else {
      console.log(MSG_RESPONSE_TIME_SUCCESS(expectedValues.timeLimit, response.responseTime));
    }
    if(expectedValues.dataOptions){
      let attrs = expectedValues.dataOptions;
      Object.keys(attrs).forEach(attr => {
        if(!(attr in response.data)){
          console.log(MSG_ATTRIBUTE_NOT_FOUND(attr, description));
        } else{
          if(typeof(response.data[attr]) !== attrs[attr]){
            console.log(MSG_ATTRIBUTE_FOUND_WRONG_TYPE(attr, attrs[attr], typeof(response.data[attr]), description));
            console.log(`attribute value:`);
            console.log(response.data[attr])
            console.log(`-----------------------------------------`);
          } else{
            console.log(MSG_ATTRIBUTE_FOUND_CORRECT_TYPE(attr, attrs[attr], typeof(response.data[attr]), description));
            console.log(`attribute value:`);
            console.log(response.data[attr])
            console.log(`-----------------------------------------`);
          }
        }
      })
    }
    if(response.status !== expectedValues.status){
      console.log(MSG_STATUS_UNEXPECTED(response.status, expectedValues.status, description));
    } else{
      console.log(MSG_STATUS_EXPECTED(response.status, expectedValues.status, description));
    }
    if(typeof(response.data) !== expectedValues.returns.toString()){
      console.log(MSG_RETURN_TYPE_FAIL(response.data, expectedValues.returns, description));
    } else{
      console.log(MSG_RETURN_TYPE_SUCCESS(response.data, expectedValues.returns, description));
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * assert() runs an API call, asserts the values and checks for errors.
 */
export async function assert(api: API, call: Call, delay?: number) {
  console.log(MSG_INITIALIZE_ASSERT(call.method, api.host, api.port, call.endpoint));
  console.log('------------------------------------')
  let expectedValues = {
    'returns': call.expectedReturnType,
    'status': call.expectedStatus,
  }
  if(call.dataOptions){
    expectedValues['dataOptions'] = call.dataOptions;
  }
  if(call.timeLimit) {
    expectedValues['timeLimit'] = call.timeLimit;
  }
  const res = await request.send(api, call, async response => {
    if(delay) {
      setTimeout(async () => {
        await check(response, call.endpoint, expectedValues, call.description);
        console.log('------------------------------------')
        return response;
      }, delay)
    } else {
      await check(response, call.endpoint, expectedValues, call.description);
      console.log('------------------------------------')
      return response;
    }
  });
}
