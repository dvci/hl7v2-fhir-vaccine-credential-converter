import { ConverterService, HL7V2Message, Resource } from '@dvci-converter/lib';
import { Request, Response } from 'express';
import { Route, Controller, Post, Body } from 'tsoa';

@Route('/convert')
export class ConverterController extends Controller {
  @Post('/')
  public async convert(@Body() message: HL7V2Message): Promise<Resource>  {
    const converter = new ConverterService();
    return converter.convert(message.message).then(r => {
      this.setStatus(200);
      return r;
    }).catch(error => {
      throw new Error(error);
    });
  }
}

export default new ConverterController();
