const express = require('express');
const moongoose = require('./db/mongoose.js');
const User = require('./models/user.js');
const Task = require('./models/task.js');

const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/tasks.js')

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

module.exports = app;
