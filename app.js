var express = require('express'); 
var app = express();
var path= require('path');
var bodyParser = require('body-parser');
var elasticsearch=require('elasticsearch');
 
app.set('public',__dirname+'/public');
app.set("view engine", "ejs")
app.set('port',  process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

var indexing = require('./controllers/indexing.js');
var client = require('./controllers/elasticsearch.js');
console.log(process.argv[2]);

if (process.argv.length > 2) {
	if ((process.argv[2]).indexOf("index") > -1) {
		indexing.indexing();
	}
}

var indexRoute = require('./routes/indexRoute.js');
app.use('/', indexRoute);

var server = app.listen(app.get('port'), function() {
    var port =server.address().port;
    console.log('Magic happens on port ' + port);
});
