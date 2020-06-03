export default interface SchemaI {
  version: number,
  cloud_name: string;
  upload_preset: string;
  private_cdn: string;
  cname: string;
  name?: string;
  path?: string;
  module?: any;
  project?: any;
  clConfiguration?: any;
}