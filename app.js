
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , index = require('./routes/index')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

if(process.argv.length < 3) {
	console.log("USAGE: sudo node app <port number> <mode>");
	process.exit();
}

app.set('port', process.env.PORT || process.argv[2]);
app.set('env', process.argv[3]);

var db = require('./models');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

process.on('uncaughtException', function (err) {
	 console.log(">> Uncaught exception: "+err);
});

app.use(function(req, res, next) {
    var err = new Error('URL Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.send(err);
});

// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}

app.get('/', index.capture);
app.get('/logMood/:val', index.logMood);
app.get('/users', user.list);

try {
	db.sequelize.sync(/*{force:true}*/).then(function() {
		http.createServer(app).listen(app.get('port'), function(){
			console.log('Express server listening on port ' + app.get('port'));
		});
	}).catch(function(error) {
		http.createServer(app).listen(app.get('port'), function(){
			console.log(">> Error from sequelize sync >> app.js: "+error);
		});
	});
} catch(error) {
	http.createServer(app).listen(app.get('port'), function(){
		console.log('>> Error from db.sequelize.sync >> app.js: '+error);
	});
}

module.exports = app;
