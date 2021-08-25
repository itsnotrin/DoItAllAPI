const { Router } = require('express')
const fs = require("fs");
const axios = require('axios');
const router = Router();
const path = require('path');
const Jimp = require('jimp');
const { getImage } = require('random-reddit');
const { rejects } = require('assert');

//Functions:

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

//Func to make a random string (you can do this way easier but I like making life hard)
function randstr(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 //Debugging:
 console.log(result)
 return result;
}

//Func to fetch an image from reddit
async function GetRedditImage(subreddit){
  try{
    const image = await getImage(subreddit)
    //Debugging: console.log(image) - Logs the url of the image chosen to the console.
    return image
  }
  catch{
    return res.json({
      "message": "Error",
      "issue": {
        "error": "Error in the function to get the reddit image.",
      }
    })
  }

  
}

//Func to generate a random inclusive number (really not needed but meh)
function getRandomNumInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included 
}


//Add all the endpoints
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

// router.get('/changemymind', (req, res) => {
//   let text = req.query.text
//   let img_name = randstr(6)
//   Jimp.read('./img/changemymind.png')
//   .then(function (image) {
//     loadedImage = image;
//     return Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
//   })
//   .then(function(font){
//     let ImagePath = path.resolve('./routes/frontend/Static/img/' + img_name + '.png')
//     loadedImage.print(font, 275, 650, "hey lol")
//     .write(ImagePath)
//     res.sendFile(ImagePath)
    
//   })
//   .catch(err => {
//     console.log("ERROR! " + err)
//     return res.json({
//       "message": "Error",
//       "issue": {
//         "error": `There has been an error! ${err}`
//       }
//     })
//   })
// })

router.get('/randommeme', async (req, res) =>{
  return res.json({
    "message": "Success",
    "response": {
      "imageLink": await GetRedditImage('memes') // Gets the reddit image then sends it
    }
  })
})

router.get('/randomsubreddit', async (req, res) => {
  let subreddit = req.query.subreddit
  if(!subreddit){
    return res.json({
      "message": "Error",
      "issue": {
        "error:": "You didn't provide a subreddit!"
      }
    })
  }
  else{
    return res.json({
      "message": "Success",
      "response": {
        "imageLink": await GetRedditImage(subreddit)
      }
    })
  }
})


router.get('/doggo', async (req, res) => {
  return res.json({
    "message": "Success",
    "response" : {
      "imageLink": await GetRedditImage('dogpictures')
    }
  })
})

router.get('/catto', async (req, res) => {
  return res.json({
    "message": "Success",
    "response": {
      "imageLink": await GetRedditImage('cat')
    }
  })
})

router.get('/cute', async (req, res) => {
  return res.json({
    "message": "Success",
    "response": {
      "imageLink": await GetRedditImage('aww')
    }
  })
})

router.get('/art', async (req, res) => {
  return res.json({
    "message": "Success",
    "response": {
      "imageLink": await GetRedditImage('Art')
    }
  })
})

router.get('/facepalm', async (req, res) => {
  return res.json({
    "message": "Success",
    "response": {
      "imageLink": await GetRedditImage('facepalm')
    }
  })
})

router.get('/lovemeter', (req, res) => {
  let person1 = req.query.person1;
  let person2 = req.query.person2;
  if(!person1 || !person2) {
    return res.json({
      "message": "Error",
      "issue": {
        "error": "You are missing one of the people's names in the request!",
      }
    })
  }
  else{
    return res.json({
      "message": "Success",
      "response": {
        "lovemeter": `${person1} and ${person2} have a ${getRandomNumInclusive(0, 100)}% love rate!`
      }
    })
  } 
})

router.get('/randomnumber', (req, res) => {
  let min = req.query.min;
  let max = req.query.max;
  if (!min || !max) {
    return res.json({
      "message": "Error",
      "issue": {
        "error": "You are missing either the min or the max in the request!"
      }
    })
  }
  else{
    return res.json({
      "message": "Success",
      "response": {
        "randomnum": getRandomNumInclusive(min, max)
      }
    })
  }
})

module.exports = router;