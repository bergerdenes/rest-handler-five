const dns = require('dns');

const osTest = require('../self-test/os-test');
const hostTools = require('../helper/host-tools');
const rv = require('../helper/request-validator');
const errorManager = require('./error-manager');
const sonarManager = require('./sonar-manager');
const logger = require('./logger');

const config = require('../config.json');

function handleHealth(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const lastError = errorManager.getError();
    const result = {
        env: config.env,
        osTest: osTest.test,
        status: lastError ? 'ERROR' : 'OK'
    };

    if (lastError) {
        if (lastError instanceof Error && lastError.message) {
            result.errorDetails = lastError.message;
        } else {
            result.errorDetails = lastError.toString();
        }
    }
    res.statusCode = lastError ? 500 : 200;
    res.end(JSON.stringify(result));
}

function handleMerge(req, res) {
    errorManager.clearError();
    const ip = hostTools.getClientIPv4(req.connection);
    // callback hell entry point
    dns.reverse(ip, (err, hostName) => {
        if (!err) {
            if (hostTools.clientHostAllowed(hostName, config.allowedHost)) { // check client hostname
                if (rv.checkHeaders(req) && // coming from BitBucket server
                    rv.checkBitbucketPostBodySchema(req)) {
                    if (rv.checkBranchDelete(req)) {
                        sonarManager.handleDelete(req.body.repository.project.name, req.body.repository.name, req.body.refChanges[0].refId);
                    }
                } else {
                    logger.error('Response is not in the proper format.');
                }
            } else {
                logger.error('Host name', hostName, 'is not allowed.');
            }
        } else {
            logger.error(err);
        }
    });

    res.end();
}


module.exports = {
    handleHealth: handleHealth,
    handleMerge: handleMerge
};