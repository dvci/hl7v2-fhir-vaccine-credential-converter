import { Liquid, Template } from 'liquidjs';
import { R4 } from  '@ahryman40k/ts-fhir-types'
import * as E from "fp-ts/lib/Either";

const hl7v2 = require("@redoxengine/redox-hl7-v2");
const path = require('path');

const engine = new Liquid({
  root: path.resolve(__dirname, '../templates/'), 
  extname: '.liquid'
});

export interface HL7V2Message {
  message: string;
}

export interface Resource {
  id: number;
  name: string;
}

export class ConverterService {
  convert(message: string): Promise<R4.IBundle> {
    const parser = new hl7v2.Parser();
    const jsonData = parser.parse(message);

    const result = engine.renderFileSync(jsonData['MSH']['9']['3'], jsonData);

    try {
      const bundle: R4.IBundle = JSON.parse(result);
      return Promise.resolve(bundle);
    }
    catch(e) {
      return Promise.reject(e);
    }
  }
}

export default new ConverterService();
