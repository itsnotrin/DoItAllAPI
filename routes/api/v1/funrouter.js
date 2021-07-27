const { Router } = require('express')

const router = Router();

router.get('/', (req, res) => {
    return res.json({
        "Error": "Missing the request link."
    })
})

module.exports = router;