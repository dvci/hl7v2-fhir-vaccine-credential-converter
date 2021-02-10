export interface HL7V2Message {
  message: string;
}

export interface Resource {
  id: number;
  name: string;
}

export class ConverterService {
  convert(message: string): Promise<Resource> {
    const example: Resource = {
      id: 1,
      name: message,
    };
    return Promise.resolve(example);
  }
}

export default new ConverterService();
