const express = require('express')
const { port } = require('./config/config.json')
const app = express()

//Import the routers
const MainRouter = require('./routes/frontend/mainrouter')
const FunRouter = require('./routes/api/v1/funrouter')
const DevRouter = require('./routes/api/v1/devrouter')
const InfoRouter = require('./routes/api/v1/inforouter')
const UtilRouter = require('./routes/api/v1/utilrouter')

//Use the routers
app.use('/', MainRouter)
app.use('/api/v1/fun', FunRouter)
app.use('/api/v1/dev', DevRouter)
app.use('/api/v1/info', InfoRouter)
app.use('/api/v1/util', UtilRouter)


//Launch the web server
try{
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}/api`)
    })
}//Throw err if there is one
catch(err){
    console.log(`ERROR: ${err}`)
}

//The start func called in test.js
function start(poort){
    app.listen(poort, () => {
        console.log(`Listening on http://localhost:${poort}/api`)
    })
    
}

//Export the start func
module.exports = { start }
