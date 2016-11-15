function getClientIPv4(socket) {
    var ip = socket.remoteAddress;
    if (socket.remoteFamily === 'IPv6') {
        ip = ip.substring(ip.lastIndexOf(':') + 1); // works only if the IPv4 is appended to ::FFFF:a.b.c.d format
    }
    return ip;
}

function clientHostAllowed(hostNameArray, host) {
    return hostNameArray.indexOf(host) > -1;
}

module.exports = {
    getClientIPv4: getClientIPv4,
    clientHostAllowed: clientHostAllowed
};