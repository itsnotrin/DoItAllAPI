const { Router } = require('express')
const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient('c415fd2508c4ce3dbe44af1b770dd10a833dfb41');
const router = Router();
const axios = require('axios')

//Add all the endpoints
router.get('/emailcheck' , (req, res) => {
  //Make a request to the eva email checker API
  let url = `https://api.eva.pingutil.com/email?email=${req.query.email}`
  axios.get(url)
  .then(function (response) {
    let resp = response["data"]
    let info = resp["data"]
    return res.json({
      "message": "Success",
      "data": {
        "email_address": info["email_address"],
        "domain": info["domain"],
        "valid_syntax": info["valid_syntax"],
        "disposable": info["disposable"],
        "webmail": info["webmail"],
        "deliverable": info["deliverable"],
        "spam": info["spam"]
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

router.get('/shortenurl', (req, res) => {
  //Shorten the url
  let url = req.query.url
  if(!req.query.url) {
    return res.json({
      "message": "Error",
      "issue": {
        "error": "You are missing the url in the request!",
      }
    })
  }
  else{
    let url = req.query.url
    async function urlshortner(url) {
      if(!url.startsWith('http')){
        return res.json({
          "message": "Error",
          "issue": {
            "error": "The url must start with http or https!",
          }
        })
      }
      if(url.startsWith('http')){
        const response = await bitly.shorten(url);
        res.json({
          "message": "Success",
          "data": {
            "shortened_url": response.link,
            "original_url": url
          }
        }) 
        }
      

    }
    urlshortner(url)
  }
  

})

router.get('/weather', (req, res) => {
  let cityName = req.query.city;
  let apiKey = "ccf94215c8d4f32f35fb58192429d01f";

  if (!cityName) {
    return res.json({
      "message": "Error",
      "issue": {
        "error:": "You didn't provide a city!"
      }
    })
  }
  else{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    axios.get(url)
    .then(function (response) {
      let info = response["data"]["weather"][0]["main"]
      return res.json({
        "message": "Success",
        "response": {
          "weather": info
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
  }
})


module.exports = router;