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
      return res.json({
        "message": "Success",
        "info": {
          "chosen": line
        }
      }) 
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
        let data = info["data"]
        let yes = info["iss_position"]
        return res.json({
            "message": "Success",
            "iss_position": {
              "longitude": yes["longitude"],
              "latitude": yes["latitude"]
            }
          }) 
    })
    //Catch the error if there is one
    .catch(function (error) {
        console.log(error)
        return res.json({
            "message": "Error",
            "issue": {
              "error": error,
            }
          })
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
        return res.json({
            "message": "Success",
            "advice": {
              "message": slip["advice"]
            }
          })
    })
    .catch(function (error) {
        console.log(error)
        return res.json({
            "message": "Error",
            "issue": {
              "error": error,
            }
          })
    })
    
})



module.exports = router;