//Require the main file
const main = require('./index.js')

//Run the start func in main
main.start(3000)

//Kill the server after 3 seconds with a good exit code, if there's an error, it will auto close with a bad error and fail CI/CD.
setTimeout((function() {
    console.log("Passed the test!")
    return process.exit(0);
}), 3000);
