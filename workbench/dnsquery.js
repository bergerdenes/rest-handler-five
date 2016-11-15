const dns = require('dns');

dns.reverse('192.168.240.54', (err, domain) => {
    if (!err) {
        console.log(domain);
        return domain;
    } else {
        console.log(err);
    }
});