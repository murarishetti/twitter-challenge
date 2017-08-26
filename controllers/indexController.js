var fs = require('fs');
var client = require('./elasticsearch.js')

module.exports.get_tweets = function(req, res) {
	var searchTerm = req.body.term;

	console.log("inside search",searchTerm);
	var search = function search(index, body) {
		return client.search({index: index, body: body});
	};

	if (searchTerm == "") {
		var body = {
			size: 10,
			from: 0,
			"query" : {
				"match_all": {
				}
			}
		}
	}
	else {
		var body = {
			size: 10,
			from: 0,
			"query": {
				"multi_match": {
					"query" : searchTerm,
					"operator" : "and",
					"fields": ["message", "user"]
				}
			},
			"highlight": {
				"fields": {
					"message" : {}
				}
			}
		}
	}
	

	search('tweets', body)
	.then(results => {
		results.hits.hits.forEach(
			(hit, index) => console.log(
				`\t${body.from + ++index} - ${hit._source.message}`
				)
			)
		console.log(searchTerm)
		console.log("results",results.hits.hits[0])
		res.json({
			success: results.hits.hits
		})
	})
	.catch(console.log("Error"));
}

module.exports.get_index = function(req, res) {
	var search = function search(index, body) {
		return client.search({index: index, body: body});
	};

	var body = {
		size: 10,
		from: 0,
		"query" : {
			"match_all": {
			}
		}
	}

	var allTweets = [];
	search('tweets', body)
	.then(results => {

		results.hits.hits.forEach(
			(hit, index) =>
			allTweets.push(hit)

			)
		console.log("results",results.hits.hits[0]);
		var tweets = {
			"success" : results.hits.hits
		}
		res.render('index', {
			tweets : tweets
		});

	})
	.catch(console.log("Error"));
}