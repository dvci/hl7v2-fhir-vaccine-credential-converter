import { ConverterService, HL7V2Message } from '@dvci-converter/lib';
import express from 'express';
import { Route, Controller, Post, Body, Request } from 'tsoa';
import { BundleTypeKind } from '@ahryman40k/ts-fhir-types/lib/R4/Resource';

interface IBundle_EntryAbstraction {
  id?: string;
  extension?: any[];
  modifierExtension?: any[];
  link?: any[];
  fullUrl?: string;
  _fullUrl?: any;
  resource?: any;
  search?: any;
  request?: any;
  response?: any;
}
interface IBundleAbstraction {
  resourceType: 'Bundle';
  id?: string;
  meta?: any;
  implicitRules?: string;
  _implicitRules?: any;
  language?: string;
  _language?: any;
  identifier?: any;
  type?: BundleTypeKind;
  _type?: any;
  timestamp?: string;
  _timestamp?: any;
  total?: number;
  _total?: any;
  link?: any[];
  entry?: IBundle_EntryAbstraction[];
  signature?: any;
}

@Route('/convert')
export class ConverterController extends Controller {
  @Post('/')
  public async convert(
    @Body() message: HL7V2Message
  ): Promise<IBundleAbstraction> {
    const converter = new ConverterService();
    return converter
      .convert(message.message)
      .then((r) => {
        this.setStatus(200);
        return r;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  @Post('/text')
  public async convertText(
    @Request() request: express.Request
  ): Promise<IBundleAbstraction> {
    const converter = new ConverterService();
    return converter
      .convert(request.body)
      .then((r) => {
        this.setStatus(200);
        return r;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

export default new ConverterController();
