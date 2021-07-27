const main = require('./index.js')

main.start()

setTimeout((function() {
    return process.kill(process.pid);
}), 3000);