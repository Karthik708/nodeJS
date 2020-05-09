require('../src/db/mongoose.js');
const User = require('../src/models/user.js');

// User.findByIdAndUpdate('5eb3c3cc4639e426e894717b', { age: 23 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 23 })
// }).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('5eb3c3cc4639e426e894717b', 2).then((count) => {
    console.log('Count', count);
}).catch((e) => {
    console.log(e);
})