const five = require('take-five');

const logger = require('./lib/logger');
const errorManager = require('./lib/error-manager');
const routes = require('./lib/route-manager');

const config = require('./config.json');

// take-five has a nice bug in cors.js :( needs monkey patching
// const opts = {
//     cors: {
//         origin: 'localhost',
//         methods: ['POST']
//     }
// };

const server = five();

server.post('/merge', routes.handleMerge);
server.get('/health', routes.handleHealth);
server.listen(config.port);

process.on('uncaughtException', err => {
    logger.error('Unhandled exception.');
    logger.log(err);
    errorManager.setError(err);
});

logger.info('Web server started. Listening on', config.port);
logger.info('Accepting  GET at /health');
logger.info('Accepting POST at /merge');
