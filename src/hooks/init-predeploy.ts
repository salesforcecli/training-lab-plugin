/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import fs             from 'node:fs';
import readline       from 'node:readline';
import { type Hook }  from '@oclif/core';
import { Lifecycle }  from '@salesforce/core';
import { ScopedPreDeploy } from '@salesforce/source-deploy-retrieve';

// The suffix that all test class names must have.
const testClassSuffix = 'Test';

// eslint-disable-next-line @typescript-eslint/require-await
const hook: Hook.Prerun = async function () {

  // Get the singleton instance of the `Lifecycle` class and register a listener for the `scopedPreDeploy` event.
  // This event is emitted from the `source-deploy-retrieve` library before a source deployment is performed.
  const lifecycle = Lifecycle.getInstance();
  lifecycle.on(
    'scopedPreDeploy',
    async (e: ScopedPreDeploy) => {
      // The `ScopedPreDeploy` event contains a `componentSet` object representing the components being deployed.
      // The `getSourceComponents()` method serializes the contents of the ComponentSet as a collection of source-backed components.
      // We'll convert that collection to an array so we can iterate over it.
      const sourceComponents = e.componentSet.getSourceComponents().toArray();

      // Iterate over `sourceComponents`.
      for await (const component of sourceComponents) {
        // Check if the component is an Apex class.
        if (component.type.name === 'ApexClass') {
          // Check if the Apex class has the @isTest annotation.
          if (await isTestClass(component.content as string)) {
            // If the class has the @isTest annotation, ensure it has the correct suffix.
            if (!component.name.endsWith(testClassSuffix)) {
              // Reject deployments of test classes that don't have the correct suffix.
              return Promise.reject({message:`Invalid test class name "${component.name}". All test class names must end with "${testClassSuffix}".`});
            }
          }
        }
      }
      // If we reach this point, all test classes have the correct suffix.
      // By returning a resolved promise, we allow the deployment to proceed.
      return Promise.resolve();
    }
  );
};

/**
 * Determines whether a given file is an Apex test class.
 * 
 * @param filename string representing the path to an Apex class file.
 * @returns boolean indicating whether the file is an Apex test class.
 */
async function isTestClass(filename: string): Promise<boolean> {
  
  // Open a readable stream to the file, then create an interface to read the file line by line.
  const fileStream = fs.createReadStream(filename, 'utf8');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // Iterate over the lines of the file.
  for await (const line of rl) {
    // Ignore leading whitespaces and check if line starts with @isTest (case-insensitive)
    if (/^\s*@istest/i.test(line)) {
      // The file contains the @isTest annotation.
      return true;
    }
  }
  // If we reach this point, the file does not contain the @isTest annotation.
  return false;
}

export default hook;
