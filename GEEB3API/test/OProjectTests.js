const User = require('../models/user');
const app = require('../app');
const assert = require('assert');
const mongoose = require('mongoose');
const request = require('request');
const baseURL = 'http://localhost:3010/oprojects';

describe('OProject testing', () => {

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


    // describe('/POST oprojects /oprojects/create', () => {
    //     it('should create a new oproject and return a status 200', (done) => {
    //         let headers = {
    //             'Content-Type': 'application/json',
    //         };
    //         const newOProject = '{"title": "Test OProject", "description": "Test OProject Description", "status": "Open", "tags": [], "highlights": [], "desirables": [], "skills": []}';
    //         request.post({
    //             url: baseURL + '/oprojects/create',
    //             headers: headers,
    //             body: newOProject
    //         },
    //         (error, response, body) => {
    //             if(error) console.log("Error in create oproject", error);
    //             assert.equal(response.statusCode, 200);
    //             console.log(JSON.parse(body));
    //             done();
    //         });
    //     });
    // });

    describe('/GET oprojects /oprojects/by/userId', () => {
        it('should get all the oprojects linked to the new user created', (done) => {
            const userId = '624734ba40ba680015d0e89a';
            request.get(baseURL + '/by/' + userId, (error, response, body) => {
                if(error) console.log("Error in get oprojects", error);
                assert.equal(response.statusCode, 200);
                //console.log(JSON.parse(body));
                done();
            });
        });
    });
    describe('Get all oProject', function(){
        it('Gets all oProject from mongo', (done) => {
            request.get(baseURL, (error, response, body) => {
                if(error) console.log("Error in get oprojects", error);
                let projects_num = JSON.parse(body).length;
                //console.log(response)
                assert.equal(projects_num, 0);
                done();
            })
        })
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
