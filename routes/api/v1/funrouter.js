const { Router } = require('express')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('../../../')

const router = Router();

router.get('/', (req, res) => {
    return res.json({
        "Error": "Missing the request link."
    })
})

router.get('/randomjoke', (req, res) => {
    return res.send("test")
})
module.exports = router;