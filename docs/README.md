![](https://i.imgur.com/OCPGagi.png)

# Describe and automatically test your REST APIs via bite-sized YAML description files. Compiles to OpenAPI.

__Note: Kameleon is a prototype/work in progress. Features may not work as intended.__

## Introduction

Kameleon is a library for API request automation and testing, while also being a documentation generator. It's aimed to be fully compatible with the OpenAPI standard. Want to separate your test files for each endpoint? Easy. Want to generate your docs without having to write the whole spec? You can! Everything with only a few commands.

## Installation

### Via npm

Install kameleon globally with NPM.

``npm install -g kameleon-tools``

### Via yarn

Install kameleon globally with Yarn.

``yarn global add kameleon-tools``

## Specification

A quick start guide on how to write kameleon tests/general usage is specified in [the docs]().

If you want to know more, you can read the [Kameleon spec]().

## Quick start

Kameleon tests are written in YAML, to initialize a test setting, run the init command.

```kameleon init```

A folder called .kameleon will be created in the directory you ran the command. It includes a sample configuration file with some feature examples. This is what is looks like:

```yaml
# This is a Kameleon sample configuration file.
# Here is where you specify your API routes and conditions,
# also, it is the file parsed by Kameleon for the actual testing.

host: localhost:3000

routes:
  /users:
    get:
      return_type: object
      status: 200
      ssl: true
      data_expected:
        users: object
  post:
    return_type: object
    status: 201
    ssl: true
    data_expected:
      username: string

  /login:
    post:
      return_type: object
      status: 200
      ssl: true
      data_expected:
        - access_token:jwt
        - refresh_token:jwt
        - roles:object
      body:
        - username:string:admin
        - password:string:admin
      headers:
        Content-Type: application/x-www-form-urlencoded
```

Let's decipher it.


### Host Object

**Host** is the host where the requests will be sent to. To make requests to more hosts, create a new file (Kameleon runs every file in the folder by default).

```yaml
host: localhost:3000
```

### Route Object

**Routes** are the endpoints that contain at least one request configuration. Their possible properties are get, post, put, delete, patch, options and the other HTTP verbs supported by [axios](https://www.npmjs.com/package/axios).

```yaml
    /login:
```

Inside routes, we have some more properties.

#### Method Object
**Method** is a property from a route that declares a method and instructions to run it. "get" describes a get request, "post" describes a post request and so on.

```yaml
    post:
      return_type: object
      status: 201
      ssl: true
      data_expected:
        username: string
      body:
        - username:string:admin
        - password:string:admin
      headers:
        Content-Type: application/x-www-form-urlencoded
```

Each method has a **return_type**, which informs Kameleon of the required return type of the response.

It also describes the desired response **status**.

For websites that support SSL (https), it's good practice to set **ssl** to true.

##### Expecting response data

Kameleon also can analyze response data and expect some response values with **data_expected**. It scans for response body parameters and check its types.

##### Body Object

You can also send a **body** to the request. You set it up like this:

```yaml
body:
  - NAME:TYPE:VALUE
```
Name is the name of the parameter, type is which type it'll have when it's sent to the API, value is the parameter value.

There's also a **params** object that works pretty much the same way.


##### Headers Object

You can also add request headers with the **headers** property. You declare headers with **name**:**type**.

```yaml
headers:
  Content-Type: application/x-www-form-urlencoded
```