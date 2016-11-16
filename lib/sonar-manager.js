const request = require('request');

const logger = require('./logger');

const config = require('../config.json');

const credentialLocation = process.env['SONAR_ADMIN_CREDENTIALS'] || '../credentials.json';

const credentials = require(credentialLocation);

function getErrorMessageFromBody(body) {
    let errMsg;
    try {
        const errBody = JSON.parse(body);
        if (errBody.err_msg) {
            errMsg = errBody.err_msg;
        } else {
            if (errBody.errors && errBody.errors instanceof Array) {
                errMsg = '';
                errBody.errors.forEach(item => errMsg += item.msg + '; ');
                if (errMsg.length >= 2) {
                    errMsg = errMsg.substring(0, errMsg.length - 2);
                }
            } else {
                errMsg = 'unknown';
            }
        }
    } catch (err) {
        errMsg = 'unknown';
    }
    return errMsg;
}

function getProject(projectName) {
    const project = config.bitBucketProjectList.find(item => item.name === projectName);
    if (!project) {
        logger.warn('Source BitBucket project "' + projectName + '" is not in config.');
        return null;
    }
    return project;
}

function getProjectRepository(projectName, repositoryName) {
    const project = getProject(projectName);
    if (!project) {
        return null;
    }

    const repo = project.repositoryMap.find(item => item.bitBucket === repositoryName);
    if (!repo) {
        logger.warn('Under project "' + projectName + '" source repository "' + repositoryName + '" is not in config.');
        return null;
    }

    if (!repo.sonarProjectName) {
        logger.warn('Under project "' + projectName + '" source repository "' + repositoryName + '" is not mapped to Sonar project name in config.');
        return null;
    }

    if (!repo.sonarProjectKey) {
        logger.warn('Under project "' + projectName + '" source repository "' + repositoryName + '" is not mapped to Sonar project key in config.');
        return null;
    }

    return repo;
}

function handleDelete(projectName, repositoryName, branchName) {
    const repo = getProjectRepository(projectName, repositoryName);
    if (!repo) return;

    const shortBranchName = branchName.substring(branchName.lastIndexOf('/') + 1);
    const sonarProjectName = repo.sonarProjectName + ' ' + shortBranchName;
    const sonarProjectKey = repo.sonarProjectKey + ':' + shortBranchName;

    const postOptions = {
        url: config.sonarApiBaseUrl + '/projects/delete',
        headers: {
            'Authorization': credentials.sonarCredentials
        },
        qs: {
            'key': sonarProjectKey
        }
    };

    request.post(postOptions, function(err, result, body) {
        if (err) {
            logger.error('Failed to call Sonar web service.');
            logger.log(err);
        } else {
            if (result.statusCode == 204) {
                logger.info('BitBucket project "' + projectName
                    + '" repository "' + repositoryName
                    + '" branch "' + branchName
                    + '" was deleted. Removing Sonar project "' + sonarProjectName + '" (project key: ' + sonarProjectKey + ')');
            } else {
                logger.error('BitBucket project "' + projectName
                    + '" repository "' + repositoryName
                    + '" branch "' + branchName
                    + '" was deleted. Removing Sonar project "' + sonarProjectName + '" (project key: ' + sonarProjectKey + ') FAILED');
                logger.log('HTTP Status code:', result.statusCode);
                logger.log('Error message:', getErrorMessageFromBody(body));
            }
        }
    });
}

module.exports = {
    handleDelete: handleDelete
};
