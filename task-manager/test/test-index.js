// require('../src/db/test-mongoose.js');
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

const User = require('../src/models/user');
const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const app = require('../src/index');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.deleteOne({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST user', () => {
        it('it should not POST a user without proper email field', (done) => {
            let user = {
                name: "Tolkien",
                email: 1954,
                password: 'Red#12456$'
            }
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('email');
                    // res.body.errors.email.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('it should POST a user with age 0, if no age field', (done) => {
            let user = {
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$'
            }
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('age').eql(0);
                    done();
                });
        });

        it('it should POST a user ', (done) => {
            let user = {
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$',
                age: 24
            }
            chai.request(app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password').length;
                    res.body.should.have.property('age');
                    res.body.should.have.property('_id');
                    done();
                });
        });

    });

    /*
  * Test the /GET/:id route
  */
    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            let user = new User({
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$',
                age: 24
            });
            user.save((err, user) => {
                chai.request(app)
                    .get('/users/' + user.id)
                    // .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('name');
                        res.body.should.have.property('email');
                        res.body.should.have.property('password');
                        res.body.should.have.property('age');
                        res.body.should.have.property('_id').eql(user.id);
                        done();
                    });
            });

        });

        it('User not found', (done) => {
            let user = new User({
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$',
                age: 24
            });
            user.save((err, user) => {
                chai.request(app)
                    .get('/users/' + '123456567899')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object').eql({});
                        done();
                    });
            });

        });

    });

    /*
    * Test the /PATCH/:id route
    */
    describe('/PATCH/:id book', () => {
        it('it should UPDATE a user given the id', (done) => {
            let user = new User({
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$',
                age: 24
            });
            user.save((err, user) => {
                chai.request(app)
                    .patch('/users/' + user.id)
                    .send({
                        name: "Saitama",
                        age: 29
                    }).end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('age').eql(29);
                        res.body.should.have.property('name').eql('Saitama');
                        done();
                    });
            });
        });

        it('it should not UPDATE a user given the id with an undefined field', (done) => {
            let user = new User({
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$',
                age: 24
            });
            user.save((err, user) => {
                chai.request(app)
                    .patch('/users/' + user.id)
                    .send({
                        name: "Saitama",
                        height: 29
                    }).end((err, res) => {
                        res.should.have.status(400);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error').eql('Invalid Updates');
                        done();
                    });
            });
        });

        it('User not found', (done) => {
            let user = new User({
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$',
                age: 24
            });
            user.save((err, user) => {
                chai.request(app)
                    .patch('/users/' + '')
                    .send({
                        name: "Saitama",
                        height: 29
                    }).end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object').eql({});
                        done();
                    });
            });
        });

    });

    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id book', () => {
        it('it should DELETE a user given the id', (done) => {
            let user = new User({
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$',
                age: 24
            });
            user.save((err, user) => {
                chai.request(app)
                    .delete('/users/' + user.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('email').eql(user.email);
                        res.body.should.have.property('password').eql(user.password);
                        res.body.should.have.property('age').eql(user.age);
                        res.body.should.have.property('name').eql(user.name);
                        done();
                    });
            });
        });

        it('User not found', (done) => {
            let user = new User({
                name: "Tolkien",
                email: "tolkien@user.com",
                password: 'Red#12456$',
                age: 24
            });
            user.save((err, user) => {
                chai.request(app)
                    .delete('/users/' + '')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object').eql({});
                        done();
                    });
            });
        });

    });

});
