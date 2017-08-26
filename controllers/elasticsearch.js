var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {  
  		host: 
  		'https://elastic:bqfddRoFLoIPzrypDsINyFXo@2a1d7c9742fc36fff3fc173c6f1b67c7.us-east-1.aws.found.io:9243',
  		log: 'trace'
});
// client.indices.delete({
// 	index: 'tweets'
// })

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
module.exports = client;