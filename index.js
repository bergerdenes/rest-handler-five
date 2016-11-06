const five = require('take-five');

const opts = {
    cors: {
        origin: 'localhost',
        methods: ['POST']
    }
};

const server = five(opts);


function getHostName(fullHostName) {
    let ci = fullHostName.indexOf(':');
    if (ci == -1) {
        return fullHostName;
    }

    return fullHostName.substring(0, ci);
}

server.post('/merge', (req, res) => {
    console.log(req.headers.host);
    console.log(getHostName(req.headers.host));
    
    res.send(req.body);
}) ;

server.listen(3000);
