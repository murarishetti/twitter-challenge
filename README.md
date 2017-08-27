# Twitter-Feed-Search-Engine

Url: https://twitter-challenge.herokuapp.com

# Prerequisites
Install Node and NPM

# Run
* npm install
* node app.js
* Local URL: http://localhost:3000

If you would like to do indexing for new txt file. Replace the current file and run **node app.js index**. 
Otherwise run simply **node app.js**

#About application
It is a search engine application for searching tweets. It is implemented using elastic search for storing and indexing the data. Elastic search provides one-one mapping using REST API or by installing locally. You can search for entire tweets and within the tweets. If you click on **@users** keyword, it will start searching for that user. The search results are sorted by relevance

#Indexing in Elastic cluster
* I have created a cluster and index "tweets".
* I have done one-one mapping using edge_ngram analyzer and added filters like stopwords, ngram.
