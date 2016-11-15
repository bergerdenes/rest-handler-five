const logger = require('./logger');

const config = require('../config.json');

function handleDelete(projectName, repositoryName, branchName) {
    const project = config.bitBucketProjectList.find(item => item.name === projectName);
    if (!project) {
        logger.warn('Source BitBucket project "' + projectName + '" is not in config.');
        return;
    }

    const repo = project.repositoryMap.find(item => item.bitBucket === repositoryName);
    if (!repo) {
        logger.warn('Under project "' + projectName + '" source repository "' + repositoryName + '" is not in config.');
        return;
    }

    if (!repo.sonarProjectName) {
        logger.warn('Under project "' + projectName + '" source repository "' + repositoryName + '" is not mapped to Sonar project in config.');
        return;
    }

    const shortBranchName = branchName.substring(branchName.lastIndexOf('/') + 1);
    const sonarProjectName = repo.sonarProjectName + ' ' + shortBranchName;
    const sonarProjectKey = repo.sonarProjectKey + ':' + shortBranchName;
    logger.info('BitBucket project "' + projectName
        + '" repository "' + repositoryName
        + '" branch "' + branchName
        + '" was deleted. Removing Sonar project "' + sonarProjectName + '" (project key: ' + sonarProjectKey + ')');
}

module.exports = {
    handleDelete: handleDelete
};
