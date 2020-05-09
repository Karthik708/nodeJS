require('../src/db/mongoose.js');
const Task = require('../src/models/task.js');

Task.findByIdAndDelete('5eb3b16d50aeda1e4043c7d0').then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});