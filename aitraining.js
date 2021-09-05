const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

console.log(tokenizer.tokenize('Tell me a joke please?'))