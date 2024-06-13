/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { type Hook } from '@oclif/core';

// eslint-disable-next-line @typescript-eslint/require-await
const hook: Hook.Prerun = async function ({ Command }) {

  // Extract the `plugin` object from the `Command` object.
  // This object contains information about the plugin that is currently running.
  const { plugin } = Command;
  if (!plugin) return;

  // Import the `ux` object from the `@oclif/core` package.
  // This will allow us to print messages to the console.
  const { ux } = await import('@oclif/core');

  // Print a green "Hello" message to the console.
  // The message includes the name and version of the plugin that implements the command the user ran.
  ux.stdout(ux.colorize('green', `\nHello from the prerun hook!\nThe plugin in use is: ${plugin.name} (${plugin.version})\n`));
};

export default hook;
