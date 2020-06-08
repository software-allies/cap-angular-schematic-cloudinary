export default interface SchemaI {
  version: number,
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadPreset?: string;
  privateCdn?: boolean;
  name?: string;
  path?: string;
  module?: any;
  project?: any;
  clConfiguration?: any;
}