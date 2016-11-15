function checkHeaders(req) {
    return req.headers
        && req.headers['user-agent']
        && req.headers['user-agent'].indexOf('Bitbucket') > -1;
}

function checkBitbucketPostBodySchema(req) {
    return req.body
        && req.body.repository
        && req.body.repository.name
        && req.body.repository.project
        && req.body.repository.project.name
        && req.body.refChanges
        && req.body.refChanges.length;
}

function checkBranchDelete(req) {
    return req.body.refChanges.length === 1
        && req.body.refChanges[0].type
        && req.body.refChanges[0].type === 'DELETE';
}

module.exports = {
    checkHeaders: checkHeaders,
    checkBitbucketPostBodySchema: checkBitbucketPostBodySchema,
    checkBranchDelete: checkBranchDelete
};