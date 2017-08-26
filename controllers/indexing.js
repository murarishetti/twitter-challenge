var client = require('./elasticsearch.js')

module.exports.indexing = function() {
	
	var matchCount = 0;
	var lineCount  = 0;

	client.indices.create({
		index: 'tweets',
		body: {
			settings: {
				analysis : {
			        analyzer : {
				            edge_ngram_analyzer : {
					                tokenizer : "standard",
									filter: ['lowercase', "edge_ngram_filter"]
				            }
			        },
					filter : {
						edge_ngram_filter :{
							type: 'edge_ngram',
							min_gram: 1,
							max_gram: 30
						}
					},
			       tokenizer : {
				          edge_ngram_tokenizer : {
					             type : "edge_ngram",
					                min_gram : 1,
					                max_gram : 30
				          }
			        }
				}
			}
		}
	});

	client.indices.putMapping({
		index: 'tweets',
		type: 'article',
		body: {
			properties: {
				message: {
					type: 'string',
					analyzer: 'edge_ngram_analyzer',
					search_analyzer: 'standard'
				}
			}
		}
	},function(err,resp,status){
		if (err) {
			console.log(err);
		}
		else {
			console.log(resp);
		}
	}
	);
	var lineReader = require('readline').createInterface({
		input: require('fs').createReadStream('assignment_tweet.txt')
	});

	var matchArray = [];
	var bulkBody = [];

	lineReader.on('line', function (line) {
		line = line.replace(/ +(?= )/g,'');
		line = line.trim();
		var string = line.split(" ");
		var messageTime = string[0] + " " + string[1];
		var user = string[string.length - 1];
		string = string.slice(2, string.length - 1)
		var message = string.join(" ");
		var item = {
			id: lineCount,
			time: messageTime,
			user: user,
			message: message
		}
		if(lineCount == 655) {
			console.log(line);
		}
		//console.log(user, message);
		bulkBody.push({
			index: {
				_index: "tweets",
				_type: "article",
				_id: lineCount
			}
		});

		bulkBody.push(item);
		
		lineCount++;
	});
	lineReader.on('close', function(){
		client.bulk({body: bulkBody})
		.then(response => {
		    var errorCount = 0;
		    response.items.forEach(item => {
		    	if (item.index && item.index.error) {
		    		console.log("err");
		    	}
		    });
		    console.log(
		    	`Successfully indexed ${data.length - errorCount}
		    	out of ${data.length} items`
		    	);
		})
		.catch(console.err);

		console.log(matchArray);
	})

}
