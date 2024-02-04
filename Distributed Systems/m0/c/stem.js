#!/usr/bin/env node

// use Porter Stemmer to stem individual terms in a streaming fashion

var readline = require('readline');
var natural = require('natural');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function (line) {
  // TODO some code
  var tokenizer = new natural.WordTokenizer();
  var tokens = tokenizer.tokenize(line);
  var stemmedTokens = tokens.map(token => natural.PorterStemmer.stem(token));
  console.log(stemmedTokens.join(' '));
});
