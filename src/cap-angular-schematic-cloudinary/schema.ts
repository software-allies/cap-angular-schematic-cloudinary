export default interface SchemaI {
  version: number,
  cloudName: string;
  uploadPreset: string;
  privateCdn: string;
  cName: string;
  name?: string;
  path?: string;
  module?: any;
  project?: any;
  clConfiguration?: any;
}