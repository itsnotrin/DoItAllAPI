const { Router } = require('express')
const tcpp = require('tcp-ping')
const router = Router();

//Add all the requests
router.get('/online', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    tcpp.ping({ address: ip }, function(err, data) {
      const latency = data["avg"]
      return res.json({
        "message": "Success",
        "online": {
          "message": `The API is online and has ${latency} to your ip!`
        }
      })
    })
});

router.get('/latency', function(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  tcpp.ping({ address: ip }, function(err, data) {
    const latency = data["avg"]
    return res.json({
      "message": "Success",
      "latency": {
        "latency": latency
      }
    })
  })
});


module.exports = router;