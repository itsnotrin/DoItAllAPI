const { Router } = require('express')
const fs = require("fs");
const router = Router();

router.get('/', (req, res) => {
    return res.json({
        "Error": "Missing the request link."
    })
})

router.get('/randomjoke', (req, res) => {
function getRandomLine(filename, callback){
  fs.readFile(filename, "utf-8", function(err, data){
    if(err) {
        throw err;
    }

    // note: this assumes `data` is a string - you may need
    //       to coerce it - see the comments for an approach
    var lines = data.split('\n');
    
    // choose one of the lines...
    var line = lines[Math.floor(Math.random()*lines.length)]

    // invoke the callback with our line
    return line;
 })
}
console.log(getRandomLine('messages/jokes.txt'))
})
module.exports = router;