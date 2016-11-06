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

function handleMerge(req, res) {
    let origin = getHostName(req.headers.host); 

    if (origin !== 'localhost') {
        res.statusCode = 403;
        res.end(JSON.stringify({ message: 'wrong origin' }));
        return;
    }
    
    res.send(req.body);
}

server.post('/merge', handleMerge);

server.listen(3000);
