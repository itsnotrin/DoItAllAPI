const { dockStart } = require('@nlpjs/basic');



(async () => {
    var start = new Date().getTime();
  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  nlp.addLanguage('en');
  await nlp.addCorpus('./Corpuses/joke.json');
  await nlp.train();
  const response = await nlp.process('en', 'can i have a joke?');
  console.log(response);
  var end = new Date().getTime();
var time = end - start;
console.log(`Took ${time}ms to run`);
})();

