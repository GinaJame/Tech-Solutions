var assert = require('assert');
const User = require("../models/user");
const axios = require('axios');
const mongoose = require('mongoose')
require("dotenv").config(); 

describe('get all O-projects of a new user with new oprojects', function () {

    describe('Get all oProject', function(){
        it('Gets all oProject from mongo', (done) => {
            axios.get(base_url, function(error, response, body) {
                let projects_num = res.bicicletas.length;
                assert.lengthOf(projects_num, 1);
                done();
            })
        })
    });

    describe('Get all oProject', function(){
        it('Gets all oProject from mongo', (done) => {
            axios.get(base_url, function(error, response, body) {
                let res = JSON.parse(body);
                assert.equal(response.statusCode, 200);
                let projects_num = res.bicicletas.length;
                assert.equal(projects_num, 0);
                done();
            })
        })
    });
    
})