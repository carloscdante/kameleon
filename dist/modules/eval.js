"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
const request = require("./request");
const messages_1 = require("../misc/messages");
function check(response, endpoint, expectedValues) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (expectedValues.dataOptions) {
                let attrs = expectedValues.dataOptions.mustHaveAttribute.split(',');
                attrs.forEach(attr => {
                    if (!(attr in response.data)) {
                        console.log((0, messages_1.MSG_ATTRIBUTE_NOT_FOUND)(attr));
                    }
                    else {
                        console.log((0, messages_1.MSG_ATTRIBUTE_FOUND)(attr));
                        console.log(`-----------------------------------------`);
                        console.log(`attribute value: ${response.data.attr}`);
                    }
                });
            }
            if (response.status !== expectedValues.status) {
                console.log((0, messages_1.MSG_STATUS_UNEXPECTED)(response.status, expectedValues.status));
            }
            else {
                console.log((0, messages_1.MSG_STATUS_EXPECTED)(response.status, expectedValues.status));
            }
            if (typeof (response.data) !== expectedValues.returns.toString()) {
                console.log((0, messages_1.MSG_RETURN_TYPE_FAIL)(response.data, expectedValues.returns));
            }
            else {
                console.log((0, messages_1.MSG_RETURN_TYPE_SUCCESS)(response.data, expectedValues.returns));
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
/**
 * assert() runs an API call, asserts the values and checks for errors.
 */
function assert(api, call) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log((0, messages_1.MSG_INITIALIZE_ASSERT)(call.method, api.host, api.port, call.endpoint));
        console.log('------------------------------------');
        let expectedValues = {
            'returns': call.expectedReturnType,
            'status': call.expectedStatus
        };
        if (call.dataOptions) {
            expectedValues['dataOptions'] = call.dataOptions;
        }
        const res = yield request.send(api, call, (response) => __awaiter(this, void 0, void 0, function* () {
            yield check(response, call.endpoint, expectedValues);
            return response;
        }));
    });
}
exports.assert = assert;
