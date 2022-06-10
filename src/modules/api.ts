export class API {
  public host: String;
  public port: number;

  constructor(host: String, port: number){
    this.port = port;
    this.host = host;
  }
}

export class Call {
  public api: API;
  public method: String;
  public endpoint: String;
  public parameters?: Object;
  public headers?: Object;
  public body?: Object;
  public dataOptions?: Object;
  public expectedReturnType: String;
  public expectedStatus: number;
  public https: boolean;
  public isValid: boolean;
  public description?: String
  public timeLimit?: String

  constructor(api: API, method: String, endpoint: String, expectedReturnType: String, expectedStatus: number, https: boolean,
    parameters?: Object, headers?: Object, body?: Object, dataOptions?: Object, description?: String, timeLimit?: String){
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
    this.description = description;
    this.timeLimit = timeLimit;
  }
}
