const { Router } = require('express')
const router = Router();
const fs = require('fs');
const { dockStart } = require('@nlpjs/basic');

//Add all the endpoints

//Func to get a random line from a text file
function getRandomLine(filename, res){
    fs.readFile(filename, "utf-8", function(err, data){
      if(err) {
          throw err;
      }
  
      // Split the new lines into proper new lines
      var lines = data.split('\n');
      
      // choose one of the lines...
      var line = lines[Math.floor(Math.random()*lines.length)]
  
      // Respond to the res request with the line!
      return res.json({
        "message": "Success",
        "response": {
          "answer": line
        }
      })
      // FOR DEBUGGING: return console.log(line);
      
   })
}


router.get('/ask', async (req, res) => {
    let message = req.query.message;
    if(!message) {
        return res.json({
            "message": "Error",
            "issue": {
              "error": "You are missing the message!",
            }
          })
    }
    (async () => {
        var start = new Date().getTime();
      const dock = await dockStart({ use: ['Basic']});
      const nlp = dock.get('nlp');
      nlp.addLanguage('en');
      await nlp.addCorpus('./Corpuses/joke.json');
      await nlp.addCorpus('./Corpuses/insult.json')
      await nlp.addCorpus('./Corpuses/fact.json')
      await nlp.addCorpus('./Corpuses/pickupline.json')
      await nlp.train();
      const response = await nlp.process('en', message);
      var end = new Date().getTime();
      var time = end - start;
      console.log(`Took ${time}ms to run`);
      if(response["answer"] == "return a joke"){
        getRandomLine('messages/jokes.txt', res)
      }
      else if(response["answer"] == "return an insult"){
        getRandomLine('messages/insults.txt', res)
      }
      else if(response["answer"] == "return a fact"){
        getRandomLine('messages/facts.txt', res)
      }
      else if(response["answer"] == "return a pickup line"){
        getRandomLine('messages/pickuplines.txt', res)
      }
      else{
        return res.json({
            "message": "Success",
            "response": {
              "answer": "Answer unclear. Try wording your message differently!"
            }
          })
      }

    })();
})

module.exports = router;