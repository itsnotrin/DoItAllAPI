const { Router } = require('express')
const tcpp = require('tcp-ping')
const router = Router();

//Add all the requests
router.get('/online', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    tcpp.ping({ address: ip }, function(err, data) {
      const latency = data["avg"]
      return res.json({
        "Success!": `The API is up with ${latency} latency to your ip!`
      })
    })
  });


module.exports = router;