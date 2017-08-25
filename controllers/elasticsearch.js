var elasticsearch=require('elasticsearch');


var client = new elasticsearch.Client( {  
  		host: 
  		'https://elastic:bqfddRoFLoIPzrypDsINyFXo@2a1d7c9742fc36fff3fc173c6f1b67c7.us-east-1.aws.found.io:9243',
  		log: 'trace'
});

module.exports = client;