var url = require('url');

var express = require('express');
var app = express();

app.get('/search', function (req, res) {
    var qhttp = require('q-io/http');
    var lookupServiceUri = require('./appConfig').LOOKUP_SERVICE_URL;

    var lookupUrl = lookupServiceUri + 'lookup?limit=100&q=' + encodeURIComponent(req.query.term);
    console.log(lookupUrl)
    qhttp.read(lookupUrl)
        .then((data) => data.toString('utf-8') )
        .then(JSON.parse)
        .then((data) => {

            res.json(data.data.map(
                (i) => {
                    i.name = i.login
                    return i;
                }
            ));
        })
        .fail(() => { res.fail(500); } );
});

app.post('/send-notification', function(req, res) {



});

app.use(express.static(__dirname + '/dist'));


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});