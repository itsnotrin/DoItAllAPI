const main = require('./index.js')

main.start(3000)

setTimeout((function() {
    return process.kill(process.pid);
}), 3000);