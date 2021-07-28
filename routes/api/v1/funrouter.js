const { Router } = require('express')
const fs = require("fs");
const axios = require('axios');
const router = Router();


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
      return res.send(line);
      // FOR DEBUGGING: return console.log(line);
      
   })
}


//Add all the requests
router.get('/', (req, res) => {
    return res.json({
        "Error": "Missing the request link."
    })
})

router.get('/randomjoke', (req, res) => {
    getRandomLine('messages/jokes.txt', res);
})

router.get('/randompickupline', (req, res) => {
    getRandomLine('messages/pickuplines.txt', res);
})

router.get('/insults', (req, res) => {
    getRandomLine('messages/insults.txt', res);
})

router.get('/8ball', (req, res) => {
    getRandomLine('messages/8ball.txt', res);
})

router.get('/iss-location', (req, res) => {
    //Make a request to the ISS api
    let url = 'http://api.open-notify.org/iss-now.json'
    //Make a get request using axios to the api
    axios.get(url)
    .then(function (response) {
        let info = response["data"]
        // DEBUGGING: console.log(info["iss_position"])
        return res.send(info["iss_position"]) 
    })
    //Catch the error if there is one
    .catch(function (error) {
        console.log(error)
        return res.send(`ERROR: ${error}`)
    })
})

router.get('/advice', (req, res) => {
    //Make a request to the API being used for advice
    let url = 'https://api.adviceslip.com/advice'
    //Make the actual get request using axios to the api
    axios.get(url)
    .then(function (response) {
        let info = response["data"]
        let slip = info["slip"]
        return res.send(slip["advice"])
    })
    .catch(function (error) {
        console.log(error)
        return res.send(`ERROR: ${error}`)
    })
    
})



module.exports = router;