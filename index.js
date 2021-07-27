const express = require('express')
const { port } = require('./config/config.json')
const PORT = process.env.PORT || port;
const app = express()

app.set('trust proxy', 'loopback, 0.0.0.0')
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
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}/api`)
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
