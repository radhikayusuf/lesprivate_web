var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser')

app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Service start on port : ' + port);