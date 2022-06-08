var assert = require('assert');
const User = require("../models/user");
const axios = require('axios');
const Sproject = require("../models/sproject");
const mongoose = require('mongoose')
require("dotenv").config(); 


describe('get all O-projects of a new user with new oprojects', function () {
    
    describe('Get all sProject', function(){
        it('Gets all sProject from mongo', (done) => {
            axios.get(base_url, function(error, response, body) {
                let projects_num = res.bicicletas.length;
                assert.lengthOf(projects_num, 1);
                done();
            })
        })
    });
})