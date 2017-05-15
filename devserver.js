const url = require('url');
const bodyParser = require('body-parser')
const qhttp = require('q-io/http');
const express = require('express');

let app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.get('/search', function (req, res) {
    const lookupServiceUri = require('./appConfig').LOOKUP_SERVICE_URL;
    const lookupUrl = lookupServiceUri + 'lookup?limit=100&q=' + encodeURIComponent(req.query.term);

    qhttp.read(lookupUrl)
        .then(data => data.toString('utf-8') )
        .then(JSON.parse)
        .then(data => res.json(data.data))
        .fail((e) => res.sendStatus(e.response.status || 500));
});

app.post('/send-notification', function(req, res) {
    const notificationsServiceUri = require('./appConfig').NOTIFICATIONS_SERVICE_URL;
    const notificationsUrl = notificationsServiceUri + 'event';

    const body = req.body.data;
    const headers = {
        'Content-Type': 'application/json'
    };

    const request = {
        url: notificationsUrl,
        charset: 'UTF-8',
        method: 'POST',
        headers: headers,
        body: [body]
    };

    qhttp.read(request)
        .then(data => data.toString('utf-8') )
        .then(JSON.parse)
        .then(response => res.json({code: response.status, text: response.statusText}))
        .fail(e => res.sendStatus(e.response.status || 500));
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static(__dirname + '/dist'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});