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
exports.send = void 0;
const axios = require('axios');
function send(api, call, callback) {
    return __awaiter(this, void 0, void 0, function* () {
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
        axios({
            method: method,
            url: `${protocol}://${host}:${port}${endpoint}`,
            headers: headers,
            params: parameters,
            data: body
        })
            .then(response => {
            returnedResponse['status'] = response.status;
            returnedResponse['data'] = response.data;
            callback(returnedResponse);
        });
    });
}
exports.send = send;
