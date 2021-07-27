const express = require('express')
const { port } = require('./config/config.json')
const app = express()


//Import the routers
const FunRouter = require('./routes/api/v1/funrouter')
const DevRouter = require('./routes/api/v1/devrouter')

//Use the routers
app.use('/api/v1/fun', FunRouter)
app.use('/api/v1/dev', DevRouter)

// app.get('/', (req, res) => {
//     return res.json({
//         "Success!": "Online!"
//     })
// })

try{
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${process.env.port || 5000}/api`)
    })
}
catch(err){
    console.log(`ERROR: ${err.message}`)
}

function start(poort){
    app.listen(poort, () => {
        console.log(`Listening on http://localhost:${poort}/api`)
        console.log("TEST SUCCESSFUL!")
    })
    
}
module.exports = { start }
