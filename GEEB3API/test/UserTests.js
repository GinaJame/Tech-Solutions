const User = require('../models/user');
const app = require('../app');
const assert = require('assert');
const mongoose = require('mongoose');
const request = require('request');
const baseURL = 'http://localhost:3010/users';
// import request from "request";

describe('User testing', () => {

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

    // describe('/PUT user /users/update/:id', function () {
    //     it('should update the new user created and return a status 200', function () {
    //         let id = 'test@Arqui.com';
    //         let headers = {
    //             'Content-Type': 'application/json',
    //         };
    //         const updatedUser = '{"email": "test@Arquitectura.com", "password": "testPassword1"}';
    //         request.put({
    //             url: baseURL + '/update/' + id,
    //             headers: headers,
    //             body: updatedUser 
    //         }, 
    //         (error, response, body) => {
    //             if(error) console.log("Error in update user", error);
    //             assert.equal(response.statusCode, 200);
    //             console.log(JSON.parse(body));
    //             done();
    //         })
    //     });
    // });

    
    // describe('/GET user /users/mail-query/:username', function () {
    //     it('should return the email of the user and return a status 200', function (done) {
    //         let username = 'ArquiTestUser';
    //         request.get(baseURL + '/users/mail-query/' + username, (error, response, body) => {
    //             if(error) console.log("Error in get email from username", error);
    //             assert.equal(response.statusCode, 200);
    //             done();
    //         }) 
    //     });
    // });

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
    describe('Get all Users', function(){
        it('Gets all users from mongo', (done) => {
            request.get(baseURL, (error, response, body) => {
                if(error) console.log("Error in get users", error);
                let users_num = JSON.parse(body).length;
                //console.log(response)
                assert.equal(users_num, 0);
                done();
            })
        })
    });

    /*describe('FindByusername', function(){
        it('Finds a user by username', (done) => {
            let headers = {'content-type' : 'application/json'}
            let body = {
                username : "gina2122"
            }
            request.post(
                {headers: headers, 
                url: baseURL + "/by-username", 
                body: body}
                ,(error, response, body) =>{
                 if(error) console.log("Error in get ssprojects", error);
                //let res = JSON.parse(body);
                console.log(body);
                assert.equal(response.statusCode, 200);
                //console.log(res);
                done();
            })
        })
    });
    */
    describe('FindByEmail', function(){
        it('Finds a user by email', (done) => {
            let headers = {'content-type' : 'application/json'}
            let reqBody = {
                email : "gina@dummy.com"
            }
            request.post(
                {headers: headers, 
                url: baseURL + "/by-email", 
                body: reqBody}
                ,(error, response, body) =>{
                //let res = JSON.parse(body);
                if(error) console.log("Error in get ssprojects", error);
                console.log(response);
                assert.equal(response.statusCode, 401);
                //console.log(res);
                done();
            })
        })
    });
});
