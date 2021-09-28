import { Liquid } from 'liquidjs';
import { R4 } from '@ahryman40k/ts-fhir-types';
import hl7v2 from '@redoxengine/redox-hl7-v2';
import path from 'path';
import z32 from '../schema/RSP_K11_Z32.json';

const engine = new Liquid({
  root: path.resolve(__dirname, '../templates/'),
  extname: '.liquid',
});

export interface HL7V2Message {
  message: string;
}

export interface ConverterError {
  type: string;
  error: Error;
}

export class ConverterService {
  convert(message: string): Promise<R4.IBundle> {
    let jsonData;
    try {
      const parser = new hl7v2.Parser(z32);
      jsonData = parser.parse(message);
    } catch (e) {
      return Promise.reject({ type: 'ERR_PARSE', error: e });
    }

    let result;
    try {
      result = engine.renderFileSync(jsonData['MSH']['9']['3'], jsonData);
    } catch (e) {
      if ((e as Error).message.includes('ENOENT: Failed to lookup')) {
        return Promise.reject({ type: 'ERR_UNSUPPORTED', error: e });
      }
      return Promise.reject({ type: 'ERR_TRANSLATE', error: e });
    }

    try {
      const bundle: R4.IBundle = JSON.parse(result);
      return Promise.resolve(bundle);
    } catch (e) {
      return Promise.reject({ type: 'ERR_INVALID', error: e });
    }
  }
}

export default new ConverterService();
