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

Install all package dependencies (one time operation) - requires NPM version >7 for monorepo.

```shell
npm install
```

## Build lib

Build lib package. Will need to be repeated with each code update. Currently npm does not support running top level scripts in a monorepo.

```shell
cd packages/lib
npm run compile
```

## Test lib

Run the Mocha unit tests

```shell
npm test
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
* Invoke the `/api/v1/convert/text` endpoint with the following sample

```
MSH|^~\&|MYEHR|DCS|MYIIS||201201130000-500||VXU^V04^VXU_V04|45646ug|P|2.5.1|||ER|AL|||||Z22^CDCPHINVS
PID|1||432155^^^dcs^MR||Patient^Johnny^New^^^^L|Lastname^Sally^^^^^M|20110411|M||1002-5^Native American^HL70005|123 Any St^^Somewhere^WI^54000^^L||^PRN^PH^^^111^2320112|||||||||2186-5^not Hispanic^CDCREC
NK1|1|Patient^Sally^^^^^L|MTH^Mom^HL70063|123 Any St^^Somewhere^WI^54000^^L
ORC|RE||65929^DCS|||||||^Clerk^Myron||
RXA|0|1|20110415||85^hep B, unspec^CVX|999|||01^historical^NIP001||||||12345|||||CP|A
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