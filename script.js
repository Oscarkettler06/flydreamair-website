function writeTest(){
// Requiring fs module in which
// writeFile function is defined.
const fs = require('fs')

// Data which will write in a file.
let data = "Hello world."

// Write data in 'Hello.txt' .
fs.writeFile('Hello.txt', data, (err) => {

    // In case of a error throw err.
    if (err) throw err;
})
}