# HL7 v2-to-FHIR vaccine credential converter

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

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/dvci/hl7v2-fhir-vaccine-credential-converter. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/dvci/hl7v2-fhir-vaccine-credential-converter/blob/master/CODE_OF_CONDUCT.md).

## License

Copyright 2020 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
```
http://www.apache.org/licenses/LICENSE-2.0
```
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Code of Conduct

Everyone interacting in the HealthCards project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/dvci/hl7v2-fhir-vaccine-credential-converter/blob/master/CODE_OF_CONDUCT.md).