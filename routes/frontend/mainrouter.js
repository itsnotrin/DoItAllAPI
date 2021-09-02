const { Router } = require('express')
const router = Router();
const path = require('path')

//Add all the endpoints
router.get('/', (req, res) => {
    //Uses the current directory and then sends the Static index.html
    res.sendFile(path.join(__dirname, './Static/html/index.html'));
});





module.exports = router;