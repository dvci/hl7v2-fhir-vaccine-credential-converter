## Quick Start

Get started developing...

```shell
# install dependencies in monorepo
npm install

# package lib
cd packages/lib
npm run compile

# run in development mode
cd ../api
npm run dev

# run tests
npm run test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Build

Build lib package. Will need to be repeated with each code update. Currently npm does not support running top level scripts in a monorepo.

```shell
cd packages/lib
npm run compile
```

## Run It
#### Run API in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
cd packages/api
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open your browser to [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
* Invoke the `/examples` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/examples
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```