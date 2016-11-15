const chalk = require('chalk');

const config = require('../config.json');

function log() {
    console.log(...arguments);
}

function screenInfo() {
    log(chalk.green('INFO:'), ...arguments);
}

function screenWarn() {
    log(chalk.yellow('WARNING:'), ...arguments);
}

function screenError() {
    log(chalk.red('ERROR:'), ...arguments);
}

function plainInfo() {
    log('INFO:', ...arguments);
}

function plainWarn() {
    log('WARNING:', ...arguments);
}

function plainError() {
    log('ERROR:', ...arguments);
}

const loggerObject = {
    log: log
};

const logTarget = (config.logDestination || 'screen').toLowerCase();

switch (logTarget) {
    case 'file':
        loggerObject.info = plainInfo;
        loggerObject.warn = plainWarn;
        loggerObject.error = plainError;
        break;
    case 'screen':
    default:
        loggerObject.info = screenInfo;
        loggerObject.warn = screenWarn;
        loggerObject.error = screenError;
        break;
}

module.exports = loggerObject;
