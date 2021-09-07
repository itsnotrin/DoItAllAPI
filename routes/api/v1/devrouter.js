const { Router } = require('express')
const tcp = require('tcp-ping')
const router = Router();

//Add all the endpoints
router.get('/online', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    tcp.ping({ address: ip }, function(err, data) {
      const latency = data["avg"]
      return res.json({
        "message": "Success",
        "online": {
          "message": `The API is online and has ${latency} to your ip!`
        }
      })
    })
});

router.get('/latency', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  tcp.ping({ address: ip }, function(err, data) {
    const latency = data["avg"]
    return res.json({
      "message": "Success",
      "latency": {
        "latency": latency
      }
    })
  })
});

router.get('/calls', (req, res) => { 
  //When logging is set up, make it call here then show the stats
  return res.json({
    "message": "Error",
    "error": {
      "message": "This endpoint is still in development!"
    }
  })
})


module.exports = router;