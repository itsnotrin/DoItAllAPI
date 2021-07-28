const express = require('express')
const { port } = require('./config/config.json')
const app = express()

//Import the routers
const FunRouter = require('./routes/api/v1/funrouter')
const DevRouter = require('./routes/api/v1/devrouter')

//Use the routers
app.use('/api/v1/fun', FunRouter)
app.use('/api/v1/dev', DevRouter)


//Launch the web server
try{
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}/api`)
    })
}//Throw err if there is one
catch(err){
    console.log(`ERROR: ${err.message}`)
}

//The start func called in test.js
function start(poort){
    app.listen(poort, () => {
        console.log(`Listening on http://localhost:${poort}/api`)
        console.log("TEST SUCCESSFUL!")
    })
    
}

//Export the start func
module.exports = { start }
