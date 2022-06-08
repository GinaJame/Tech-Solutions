const User = require('../models/user');
const app = require('../app');
const assert = require('assert');
const mongoose = require('mongoose');
const request = require('request');
const baseURL = 'http://localhost:3010';
const Sproject = require("../models/sproject");

describe('SProject testing', () => {
    beforeEach((done) => {
        var mongoDB = 'mongodb+srv://geeb:geeb357@cluster0.dxgwa.mongodb.net/development01?retryWrites=true&w=majority'
        mongoose.connect(mongoDB, { useNewUrlParser: true})

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB Connection Error'));
        db.once('open', () => {
            console.log('Connection to mongoDB succesful');
            done();
        })
    });

    // describe('/POST user /users/register', () => {
    //     it('should create a new user and return a status 200', (done) => {
    //         let headers = {
    //             'Content-Type': 'application/json',
    //         };
    //         const newUser = '{"username": "ArquiTestUser", "email": "test@Arqui.com", "password": "testPassword"}';
    //         request.post({
    //             url: baseURL + '/users/register',
    //             headers: headers,
    //             body: newUser
    //             },
    //             (error, response, body) => {
    //                 if(error) console.log("Error in register user", error);
    //                 assert.equal(response.statusCode, 200);
    //                 console.log(JSON.parse(body));
    //                 done();
    //             }
    //         )});
    // });

    // describe('/POST sproject /sprojects/create', () => {
    //     it('should create a new sproject and return a status 200', (done) => {
    //         let headers = {
    //             'Content-Type': 'application/json',
    //         };
    //         const newSproject = '{"title": "ArquiTestSproject", "description": "Test description", "userId": "624734ba40ba680015d0e89a", "links": [], "imageurls": [], "tags": []}';
    //         request.post({
    //             url: baseURL + '/sprojects/create',
    //             headers: headers,
    //             body: newSproject
    //         },
    //         (error, response, body) => {
    //             if(error) console.log("Error in create sproject", error);
    //             assert.equal(response.statusCode, 200);
    //             console.log(JSON.parse(body));
    //             done();
    //         }
    //     )});
    // });

    describe('/GET sproject /sprojects/:id', () => {
        it('should get a sproject and return a status 200', (done) => {
            const userId = '603dbd54383aca0c1cb5273d'
            request.get(baseURL + '/sprojects/' + userId, (error, response, body) => {
                if(error) console.log("Error in get sproject", error);
                console.log(JSON.parse(body));
                assert.equal(response.statusCode, 200);
                done();
            });
        });
    });

    // describe('/GET user /users/delete/:id', function () {
    //     it('should delete the new user created and return a status 200', function () {
    //         let email = 'test@Arqui.com';
    //         request.get(baseURL + '/delete/' + email, (error, response, body) => {
    //             if(error) console.log("Error in delete user", error);
    //             assert.equal(response.statusCode, 200);
    //             console.log(JSON.parse(body));
    //             done();
    //         })
    //     });
    // });
});

