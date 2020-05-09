const fs = require('fs');
// fs.writeFile('notes.txt', 'My name is KarthikK.', (err) => {
//     console.log('write ', err);
// });

fs.appendFileSync('notes.txt', ' I am from HYD.');


// fs.stat('notes.txt', (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         fs.readFile('notes.txt', (err, data) => {
//             console.log('read', data.toString());
//         });
//     }

// });