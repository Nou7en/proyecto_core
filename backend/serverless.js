const { createServer } = require('@vercel/node');
const app = require('./dist/main').app; // Ruta al archivo build del NestJS

module.exports = createServer(app);
