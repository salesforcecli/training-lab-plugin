/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { type Hook } from '@oclif/core';

// eslint-disable-next-line @typescript-eslint/require-await
const hook: Hook.Prerun = async function ({ Command }) {
  // Don't run this hook if the --json flag is set
  if (process.argv.includes('--json')) return;

  // Don't run this hook if the `Command` object doesn't have a `plugin` property.
  const { plugin } = Command;
  if (!plugin) return;

  // Import the `ux` object from the `@oclif/core` package.
  // This will allow us to print messages to the console.
  const { ux } = await import('@oclif/core');

  // Print a message to the console.
  ux.warn(`Hello from the prerun hook of "${plugin.name}" (${plugin.version})!`);
};

export default hook;
