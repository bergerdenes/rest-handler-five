function getTimeStamp() {
    const d = new Date();
    return d.getUTCFullYear() + '-' + addLeadingZeros(d.getUTCMonth() + 1, 2) + '-' + addLeadingZeros(d.getUTCDate(), 2) + ' '
         + addLeadingZeros(d.getUTCHours(), 2) + ':' + addLeadingZeros(d.getUTCMinutes(), 2) + ':' + addLeadingZeros(d.getUTCSeconds(), 2) + '.' + addLeadingZeros(d.getUTCMilliseconds(), 3);
}

function addLeadingZeros(number, digits) {
    const str = number.toString();
    return ('0'.repeat(digits) + str).slice(-digits);
}

module.exports = {
    getTimeStamp: getTimeStamp
};