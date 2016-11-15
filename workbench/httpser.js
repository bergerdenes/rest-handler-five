const http = require('http');


const server = http.createServer(function(req, res) {
    let body = '';
    req.on('data', function(data) {
        body += data;
    });

    req.on('end', function() {
        const json = JSON.parse(body);
        if (json &&
            json.refChanges &&
            typeof json.refChanges.length &&
            json.refChanges.length === 1 &&
            json.refChanges[0].type &&
            json.refChanges[0].type === 'DELETE') {

            console.log('Branch ', json.refChanges[0].refId, 'was deleted');
            // TODO
        }
    });
    res.end();
});

server.listen(3000, function() {
    console.log('Started web server');
});