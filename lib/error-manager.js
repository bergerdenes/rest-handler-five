var lastError = null;

function clearError() {
    setError(null);
}

function getError() {
    return lastError;
}

function setError(err) {
    lastError = err;
}

module.exports = {
    clearError: clearError,
    getError: getError,
    setError: setError
};