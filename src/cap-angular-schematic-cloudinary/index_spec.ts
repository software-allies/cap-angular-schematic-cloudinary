import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';


const collectionPath = path.join(__dirname, '../collection.json');


describe('cap-angular-schematic-cloudinary', () => {
  it('works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('cap-angular-schematic-cloudinary', {}, Tree.empty());

    expect(tree.files).toEqual([]);
  });
});
