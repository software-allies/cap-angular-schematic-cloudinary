import {
  Rule,
  Tree,
  chain,
  SchematicContext
} from '@angular-devkit/schematics';
import * as cap_utilities from '../../../../cap-utilities/dist/index';
import { NodeDependencyType } from 'schematics-utilities';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import SchemaI from './schema';
// You don't have to export the function as default. You can also have more than one rule factory
// per file.


export function addPackageJsonDependencies(_options: SchemaI): Rule {
  return (host: Tree) => {
    cap_utilities.addPackageToPackageJson(host, NodeDependencyType.Default, 'cloudinary-core', '2.8.2')
    switch (_options.version) {
      case 2:
        cap_utilities.addPackageToPackageJson(host, NodeDependencyType.Default, `@cloudinary/angular-${_options.version}.x`, '1.2.2')
        break;
      case 4:
        cap_utilities.addPackageToPackageJson(host, NodeDependencyType.Default, `@cloudinary/angular-${_options.version}.x`, '1.1.0')
        break;

      default:
        cap_utilities.addPackageToPackageJson(host, NodeDependencyType.Default, `@cloudinary/angular-${_options.version}.x`, '1.2.2')
        break;
    }

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

export function capAngularSchematicCloudinary(_options: SchemaI): Rule {
  return (tree: Tree, _context: SchematicContext) => cap_utilities.setupOptions(tree, _options);
}

function addModuleToImports(options: SchemaI): Rule {
  return (host: Tree) => {
    options.clConfiguration = 'Cloudinary';
    const filePath = `${options.path}/app/app.module.ts`;
    cap_utilities.appendToStartFile(host, filePath, `import * as  Cloudinary from 'cloudinary-core';`)
    cap_utilities.addToNgModule(host, options,
      [{
        name: 'CloudinaryModule',
        path: `@cloudinary/angular-${options.version}.x`,
        type: 'module',
        forRootValues: {
          configuration: options.clConfiguration.replace(`'`, ''),
          params: [
            {
              name: 'cloud_name',
              value: `${options.cloudName}`
            },
            {
              name: 'api_key',
              value: `${options.apiKey}`
            },
            {
              name: 'api_secret',
              value: `${options.apiSecret}`
            },
            {
              name: 'upload_preset',
              value: `${options.uploadPreset}`
            },
            {
              name: 'private_cdn',
              value: `${options.privateCdn}`
            }
          ]
        }
      }]
    )
  }
}

export default function (options: SchemaI): Rule {
  return chain([
    capAngularSchematicCloudinary(options),
    addPackageJsonDependencies(options),
    installPackageJsonDependencies(),
    addModuleToImports(options),
  ]);
}
