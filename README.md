# HL7 v2-to-FHIR vaccine credential converter

## Quick Start

Get started developing...

```shell
# install dependencies in monorepo
npm install

# package lib
npm run --prefix packages/lib compile

# run in development mode
npm run --prefix packages/api dev

# run tests
npm run --prefix packages/lib test
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

Compiles the application and starts it in production mode.

```shell
npm run compile
npm start
```

#### Run in Docker:

Creates Docker image and starts it in container.

```shell
docker build -t dvci-converter .
docker run --publish 3000:3000 dvci-converter
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
MSH|^~\&|^^|MA0000^^|^^|GA0000^^|20111105122535||RSP^K11^RSP_K11|1320521135996.100000002|T|2.5.1|||||||||Z32^CDCPHINVS^^|
MSA|AA|19970522GA40||
QAK|||Z34^Request Immunization History^HL70471|
QPD|Z34^Request Immunization History^HL70471|19970522GA05||FLOYD^FRANK^^^^^L|MALIFICENT|20030123|M|L|
PID|1||432155^^^dcs^MR||Patient^Johnny^New^^^^L|Lastname^Sally^^^^^M|20110411|M||1002-5^Native American^HL70005|123 Any St^^Somewhere^WI^54000^^L||^PRN^PH^^^111^2320112|||||||||2186-5^not Hispanic^CDCREC
PD1|||^^^^^^SR|21^MATT^SHAKY^K^^^^^^^^^SR~1679652135|||||||02^Reminder/recall -any method^HL70215|||||A^Active^HL70441|
NK1|1|Patient^Sally^^^^^L|MTH^Mom^HL70063|123 Any St^^Somewhere^WI^54000^^L
PV1||R|
ORC|RE||25.34.20100723|
RXA|0|999|20110415|20110415|83^Hep A, ped/adol, 2 dose^CVX^90633^Hep A 2 dose - Ped/Adol^CPT~34^Hep A 2 dose - Ped/Adol^STC0292|999|||00^New immunization record^NIP001||IRMS-1000||||12345||SKB^GlaxoSmithKline^HL70227||||A|20111105122536|
RXR|IM^Intramuscular^HL70162|LT^Left Thigh^HL70163|
OBX|1|CE|VFC-STATUS^VFC Status^STC||V02||||||F|
OBX|1|CE|30963-3^Vaccine purchased with^LN||PBF^Public funds^NIP008||||||F|
OBX|1|CE|VFC-STATUS^VFC Status^STC||||||||F|
OBX|1|DT|29768-9^date vaccine information statement published^LN||20100120||||||F|
OBX|1|DT|29769-7^date vaccine information statement presented^LN||20100723||||||F|
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

Copyright 2021 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
```
http://www.apache.org/licenses/LICENSE-2.0
```
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Code of Conduct

Everyone interacting in the HealthCards project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/dvci/hl7v2-fhir-vaccine-credential-converter/blob/master/CODE_OF_CONDUCT.md).