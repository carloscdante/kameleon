"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Call = exports.API = void 0;
class API {
    constructor(host, port) {
        this.port = port;
        this.host = host;
    }
}
exports.API = API;
class Call {
    constructor(api, method, endpoint, expectedReturnType, expectedStatus, https, parameters, headers, body, dataOptions) {
        this.api = api;
        this.method = method;
        this.endpoint = endpoint;
        this.parameters = parameters;
        this.headers = headers;
        this.dataOptions = dataOptions;
        this.body = body;
        this.expectedStatus = expectedStatus;
        this.expectedReturnType = expectedReturnType;
        this.https = https;
    }
}
exports.Call = Call;
