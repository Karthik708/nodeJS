// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

//CRUD Create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect')
    }

    const db = client.db(databaseName);

    //CREATE

    // db.collection('users').insertOne({
    //     name: 'Karthik',
    //     age: '25'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Janet',
    //         age: 28
    //     }, {
    //         name: 'Jennifer',
    //         age: 26
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert usera')
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'today',
    //         completed: true
    //     }, {
    //         description: 'tommorow',
    //         completed: false
    //     }, {
    //         description: 'Yesterday',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks')
    //     }

    //     console.log(result.ops);
    // });

    //READ

    // db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }

    //     console.log('User', user);
    // });

    // db.collection('users').find({ age: 28 }).toArray((error, users) => {
    //     console.log(users);
    // });

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks);
    // });

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5eb225076d536b3d98a46151')
    // }, {
    //     $set: {
    //         name: 'Mike'
    //     }
    // });

    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    const updateTask = db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    });

    updateTask.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })


});