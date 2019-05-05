/* eslint no-process-env:0 */

import path from 'path';
import dotenv from 'dotenv';

const root = path.normalize(`${__dirname}/../../../`);

const env = dotenv.config({ path: path.join(root, '.env') });

const all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // dev client port
  clientPort: process.env.CLIENT_PORT || 3000,

  // Server port
  PORT: process.env.PORT || 9000,
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = all;
