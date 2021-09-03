const express = require('express')
const { port } = require('./config/config.json')
const app = express()

//Import the routers
const MainRouter = require('./routes/frontend/mainrouter')
const FunRouter = require('./routes/api/v1/funrouter')
const DevRouter = require('./routes/api/v1/devrouter')
const InfoRouter = require('./routes/api/v1/inforouter')
const UtilRouter = require('./routes/api/v1/utilrouter')
const ApiRouter = require('./routes/api/v1/ai')

//Custom Middleware
 var usageLogger = (upperCase)=>{
  
    if( typeof uppercase !== 'boolean' ){
      upperCase = true; //Just to make sure that the setting is correct
    }
    
    return (req,res,next) =>{
        if (req.url == "/"){
            //Pass it on
            next()
        }
        else{
        //Extensive Logging:  console.log('Logging:', (upperCase ? req.url.toUpperCase() : req.url.toLowerCase()));
        console.log('Someone used the API!') // Need to think of some good way to store this so I can store api usage
        next();
        }
    }
}

//Server Settings
app.use(express.static('./routes/frontend/Static'))
app.use(usageLogger(false));

//Initialize the routers
app.use('/', MainRouter)
app.use('/api/v1/fun', FunRouter)
app.use('/api/v1/dev', DevRouter)
app.use('/api/v1/info', InfoRouter)
app.use('/api/v1/util', UtilRouter)
app.use('/api/v1/api', ApiRouter)

//Launch the web server
try{
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`)
    })
}//Throw err if there is one
catch(err){
    console.log(`ERROR: ${err}`)
}

//The start func called in test.js
function start(poort){
    app.listen(poort, () => {
        console.log(`Listening on http://localhost:${poort}`)
    })
    
}

//Export the start func
module.exports = { start }
