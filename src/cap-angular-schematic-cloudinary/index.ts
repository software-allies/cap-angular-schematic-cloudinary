import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import * as cap_utilities from '../../../../cap-utilities/dist/index';
import { NodeDependencyType } from 'schematics-utilities';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import SchemaI from './schema';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.



export function addPackageJsonDependencies(): Rule {
  return (host: Tree) => {
    cap_utilities.addPackageToPackageJson(host, NodeDependencyType.Default, 'cap-storage-aws', '~3.0.3')
    return host;
  };
}

export function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return host;
  };
}

export function capAngularSchematicCloudinary(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
function addModuleToImports(options: SchemaI): Rule {
  return (host: Tree) => cap_utilities.addToNgModule(host, options,
    [{
      name: 'CloudinaryModule',
      path: `@cloudinary/angular-${options.version}.x`,
      type: 'module',
      forRootValues: {
        configuration: options.clConfiguration,
        params: [

          {
            name: 'cloud_name',
            value: `${options.cloud_name}`
          },
          {
            name: 'upload_preset',
            value: `${options.upload_preset}`
          },
          {
            name: 'private_cdn',
            value: `${options.private_cdn}`
          },
          {
            name: 'cname',
            value: `${options.cname}`
          }
        ]
      }

    }]
  )
}

export default function (options: SchemaI): Rule {
  return chain([
    capAngularSchematicCloudinary(options),
    addPackageJsonDependencies(),
    installPackageJsonDependencies(),
    addModuleToImports(options),
  ]);
}
