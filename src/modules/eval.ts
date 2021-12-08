import * as request from './request';
import { API, Call } from './api';

import {MSG_ATTRIBUTE_FOUND, MSG_STATUS_EXPECTED,
        MSG_RETURN_TYPE_FAIL, MSG_STATUS_UNEXPECTED,
        MSG_ATTRIBUTE_NOT_FOUND, MSG_RETURN_TYPE_SUCCESS,
        MSG_INITIALIZE_ASSERT} from '../misc/messages';

async function check(response, endpoint, expectedValues){
  try {
    if(expectedValues.dataOptions){
      let attrs = expectedValues.dataOptions.mustHaveAttribute.split(',');
      attrs.forEach(attr => {
        if(!(attr in response.data)){
          console.log(MSG_ATTRIBUTE_NOT_FOUND(attr));
        } else{
          console.log(MSG_ATTRIBUTE_FOUND(attr));
          console.log(`-----------------------------------------`);
          console.log(`attribute value: ${response.data.attr}`);
        }
      })
    }
    if(response.status !== expectedValues.status){
      console.log(MSG_STATUS_UNEXPECTED(response.status, expectedValues.status));
    } else{
      console.log(MSG_STATUS_EXPECTED(response.status, expectedValues.status));
    }
    if(typeof(response.data) !== expectedValues.returns.toString()){
      console.log(MSG_RETURN_TYPE_FAIL(response.data, expectedValues.returns));
    } else{
      console.log(MSG_RETURN_TYPE_SUCCESS(response.data, expectedValues.returns));
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * assert() runs an API call, asserts the values and checks for errors.
 */
export async function assert(api: API, call: Call) {
  console.log(MSG_INITIALIZE_ASSERT(call.method, api.host, api.port, call.endpoint));
  console.log('------------------------------------')
  let expectedValues = {
    'returns': call.expectedReturnType,
    'status': call.expectedStatus
  }
  if(call.dataOptions){
    expectedValues['dataOptions'] = call.dataOptions;
  }
  const res = await request.send(api, call, async response => {
    await check(response, call.endpoint, expectedValues);
    return response;
  });
}
