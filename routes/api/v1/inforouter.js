const { default: axios } = require('axios');
const { Router } = require('express')
const router = Router();

//Add all the endpoints
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
        "gibberish": info["gibberish"],
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

module.exports = router;