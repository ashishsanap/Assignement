/**
 * Main application file
 */

import express from 'express';
import http from 'http';


import CONFIG from './config/environment';
import expressConfig from './config/express';
import registerRoutes from './routes';
import connectMongo from './config/mongo';

// Setup server
const app = express();
const server = http.createServer(app);

expressConfig(app);
registerRoutes(app);

// Start server
function startServer() {
  server.listen(CONFIG.PORT, CONFIG.IP, () => {
    console.log('Express server listening on %d, in %s mode', CONFIG.PORT, app.get('env'));
  });
}
connectMongo().then((res) => {
  console.log(res);
  startServer();
})
  .catch((err) => {
    console.error('Server failed to start due to error: %s', err);
  });

// Expose app
module.exports = app;
exports = module.exports;
