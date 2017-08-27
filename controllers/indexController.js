var fs = require('fs');
var client = require('./elasticsearch.js')

module.exports.get_tweets = function(req, res) {
    var searchTerm = req.body.term;
    var counter = req.body.count;

    // console.log("inside search", searchTerm);
    var search = function search(index, body) {
        return client.search({
            index: index,
            body: body
        });
    };

    if (searchTerm == "") {
        var body = {
            size: 10,
            from: 0 + counter,
            "query": {
                "match_all": {}
            }
        }
    } else {
        var body = {
            size: 10,
            from: 0 + counter,
            "query": {
                "multi_match": {
                    "query": searchTerm,
                    "operator": "and",
                    "fields": ["message", "user"]
                }
            },
            "highlight": {
                "fields": {
                    "message": {}
                }
            }
        }
    }

    search('tweets', body)
        .then(results => {
            res.json({
                success: results.hits.hits
            })
        })
        .catch(console.log("Error"));
}

module.exports.get_index = function(req, res) {
    var search = function search(index, body) {
        return client.search({
            index: index,
            body: body
        });
    };

    var body = {
        size: 10,
        from: 0,
        "query": {
            "match_all": {}
        }
    }

    search('tweets', body)
        .then(results => {
            var tweets = {
                "success": results.hits.hits
            }
            res.render('index', {
                tweets: tweets
            });

        })
        .catch(console.log("Error"));
}