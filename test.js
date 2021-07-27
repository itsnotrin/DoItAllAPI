const main = require('./index.js')

main.start(3000)

setTimeout((function() {
    return process.exit(0);
}), 3000);