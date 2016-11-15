const os = require('os');

function getOperatingSystem() {
    return os.type() + ' ' + os.release();
}

function stringifyMemory(memoryInBytes) {
    return (Math.round(memoryInBytes / 10737418.24) / 100) + ' GB';
}

function stringifyUptime(uptimeInSeconds) {
    return Math.floor(uptimeInSeconds) + ' seconds';
}

module.exports = {
    name: 'Operating System Tests',
    test: {
        'Host Name': os.hostname(),
        'Operating System': getOperatingSystem(),
        'Architecture': os.arch(),
        'Time': (new Date()).toString(),
        'Uptime': stringifyUptime(os.uptime()),
        'Total Memory': stringifyMemory(os.totalmem()),
        'Free Memory': stringifyMemory(os.freemem()),
        'Processor Cores': os.cpus().length,
        'Load average (1 minute)': os.loadavg()[0],
        'Load average (5 minutes)': os.loadavg()[1],
        'Load average (15 minutes)': os.loadavg()[2],
        'Node Version': process.version
    }
};
