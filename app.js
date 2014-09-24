var express = require('express.io');
var http = require('http');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);


app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var mongoose = require('./config/mongoose');
var routes = require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server is listening on port ' + app.get('port'));
});
