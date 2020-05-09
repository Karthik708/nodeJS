var add = require('./add.js');
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getName() {
    rl.question('Enter your name : ', greet);
}

function greet(name) {
    console.log("Hello there, " + name + "!");
    console.log(add.add(1, 2));
    console.log(add.subtract(1, 2));
    rl.close();
}

getName()

// greet('Karthik');