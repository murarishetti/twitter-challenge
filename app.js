var express = require('express'); 
var app = express();
var path= require('path');
var bodyParser = require('body-parser');
var elasticsearch=require('elasticsearch');
 
app.set('public',__dirname+'/public');
app.set("view engine", "ejs");
app.set('port',  process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var indexing2 = require('./controllers/indexing.js');

// indexing2.indexing();
var client = require('./controllers/elasticsearch.js');
// var indices = function indices() {
//   return client.cat.indices({v: true})
//   .then(console.log)
//   .catch(err => console.error(`Error connecting to the es client: ${err}`));
// };
// indices();
var indexRoute = require('./routes/indexRoute.js');
app.use('/', indexRoute);

var server = app.listen(app.get('port'), function() {
    var port =server.address().port;
    console.log('Magic happens on port ' + port);
});
