var fs = require('fs');
var client = require('./elasticsearch.js')

module.exports.get_tweets = function(req, res) {
	 var searchTerm = req.body.term;

	console.log("inside search",searchTerm);
	var search = function search(index, body) {
	  return client.search({index: index, body: body});
	};

	//var test = function test() {
	  var body = {
	    size: 15,
	    from: 0,
	    "query": {
	      "query_string": {
            "fields" : ["message", "user"],
            "query" : searchTerm
        	}
	    }
	  }

	  search('tweets', body)
	  .then(results => {
	    //console.log(`found ${results.hits.total} items in ${results.took}ms`);
	    //console.log(`returned article titles:`);
	    results.hits.hits.forEach(
	      (hit, index) => console.log(
	        `\t${body.from + ++index} - ${hit._source.message}`
	      )
	    )
	    //console.log("results",results.hits.hits[0]._source.message)
	    res.json({
	    	success: results.hits.hits
	    })
	  })
	  .catch(console.log("Error"));
	//};
	
}

module.exports.get_index = function(req, res) {
	res.render('index');
}