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

module.exports = router;