var client = require('./elasticsearch.js')

// module.exports = client;

module.exports.indexing = function() {
	
	var matchCount = 0;
	var lineCount  = 0;
	//var searchTerm = req.body.term;
	
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
		    //console.log('here');
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
