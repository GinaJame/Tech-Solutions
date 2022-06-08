var assert = require('assert');
const User = require("../models/user");
const axios = require('axios');
const Sproject = require("../models/sproject");
const mongoose = require('mongoose')
require("dotenv").config(); 

base_url = "http://localhost:3000/users";
describe('testing users API', function () {
    describe('Get all users', function(){
        it('Gets all users from mongo', (done) => {
            axios.post(base_url + "/register", {
                email: "gina@dummy.com", 
                username: "gina2212"}).then(function(response) {
                    console.log(response.data);
                    axios.get(base_url, function(error, response, body) {
                        let users = res.newDoc.email;
                        assert.assert(email, 'gina@dummy.com');
                        done();
                    })
                })
        })
    });

    describe('FindByusername', function(){
        it('Finds a user by username', (done) => {
            let headers = {'content-type' : 'application/json'}
            let reqBody = {
                username : "gina2122"
            }
            axios.post(
                {headers: headers, 
                url: base_url + "/by-username", 
                body: reqBody}
                ,(error, response, body) =>{
                let res = JSON.parse(body);
                assert.equal(response.statusCode, 200);
                console.log(res);
                done();
            })
        })
    });
    describe('FindByEmail', function(){
        it('Finds a user by email', (done) => {
            let headers = {'content-type' : 'application/json'}
            let reqBody = {
                email : "gina@dummy.com"
            }
            axios.post(
                {headers: headers, 
                url: base_url + "/by-email", 
                body: reqBody}
                ,(error, response, body) =>{
                let res = JSON.parse(body);
                assert.equal(response.statusCode, 200);
                console.log(res);
                done();
            })
        })
    });
        
})