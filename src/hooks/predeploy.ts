/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { type Hook } from '@oclif/core';
import { Lifecycle } from '@salesforce/core';
import { ScopedPreDeploy } from '@salesforce/source-deploy-retrieve';

// eslint-disable-next-line @typescript-eslint/require-await
const hook: Hook.Prerun = async function () {
  // Get the singleton instance of the `Lifecycle` class.
  const lifecycle = Lifecycle.getInstance();

  // eslint-disable-next-line
  console.log('The INIT HOOK has run!');

  lifecycle.on(
    'scopedPreDeploy',
    async (e: ScopedPreDeploy) => {
      // eslint-disable-next-line
      console.log('WE ARE IN THE HOOK');

      // The `ScopedPreDeploy` event contains a `componentSet` object that represents the components that are being deployed.
      // The `getSourceComponents()` method serializes the contents of the ComponentSet as a collection of source-backed components.
      // We'll convert that collection to an array so we can iterate over it.
      const sourceComponents = e.componentSet.getSourceComponents().toArray();


      console.log(e.orgId);
      console.log(sourceComponents);
      // eslint-disable-next-line
      console.log(e.orgId);
      return Promise.resolve();
    },
    // 'sample-hook#scopedPreDeploy' // Commented out to work around the 
  );

  lifecycle.getListeners('scopedPreDeploy').forEach((listener) => {
    // eslint-disable-next-line
    console.log(listener);
  });


};

export default hook;
