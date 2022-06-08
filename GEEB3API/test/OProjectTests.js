const User = require('../models/user');
const app = require('../app');
const assert = require('assert');
const mongoose = require('mongoose');
const request = require('request');
const baseURL = 'http://localhost:3010/oprojects';
const axios = require('axios').default;
const OProject = require("../models/oproject");

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
    describe('GET OProject /', function(){
      beforeEach((done) => {
        const data1 = {
          title: 'Test Project 1',
          description: 'A test open project',
          highlights: [],
          tags: [],
          skills: [],
          desirables: [],
        };
        const data2 = {
          title: 'Test Project 2',
          description: 'A test open project',
          highlights: [],
          tags: [],
          skills: [],
          desirables: [],
        };
        const oproject1 = new OProject({ ...data1 });
        const oproject2 = new OProject({ ...data2 });
        oproject1.save();
        oproject2.save();
        done();
      });
  
      it('Status 200', (done) => {
        const userToken = '01'; // TODO: Get user token or set a test user token
        let headers = {
          'content-type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        };
  
        axios
          .get(baseURL, {
            headers,
          })
          .then((res) => {
            assert.equal(res.data.length, 2);
            assert.equal(res.status, 200);
          })
          .catch((error) => console.log(error));
          done();
      });

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

    describe('POST OProject /create', () => {
      it('Status 200', (done) => {
        const userToken = '01'; // TODO: Get user token or set a test user token
        let headers = {
          'content-type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        };
        const oproject = {
          title: 'Test Project',
          description: 'A test project',
          highlights: [],
          tags: [],
          skills: [],
          desirables: [],
        };
  
        axios
          .post(baseURL + '/create', {
            headers,
            body: oproject,
          })
          .then((res) => {
            assert.equal(res.statusCode, 200);
          })
          .catch((error) => done(error));
          done();
          
      });
  
      it('Status 401', function () {
        let headers = {
          'content-type': 'application/json',
        };
        const oproject = {
          title: 'Test Project',
          description: 'A test project',
          highlights: [],
          tags: [],
          skills: [],
          desirables: [],
        };
  
        axios
          .post(baseURL + '/create', {
            headers,
            body: oproject,
          })
          .then((res) => {
            assert.equal(res.statusCode, 401);
            done();
          })
          .catch((error) => done(error));
      });
    });
  
    describe('POST OProject /delete/:id', () => {
      beforeEach((done) => {
        const data = {
          title: 'Test Project',
          description: 'A test open project',
          highlights: [],
          tags: [],
          skills: [],
          desirables: [],
        };
        const oproject = new OProject({ ...data });
        oproject.save().then(() => console.log("Project saved"));
        done();
      });
  
      it('Status 200', (done) => {
        const userToken = '01'; // TODO: Get user token or set a test user token
        let headers = {
          'content-type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        };
        axios
          .post(baseURL + `/delete/${oproject._id}`, {
            headers,
            body: oproject,
          })
          .then((res) => {
            assert.equal(res.statusCode, 200);
            done();
          })
          .catch((error) => done(error));
      });
  
      it('Status 401', function () {
        let headers = {
          'content-type': 'application/json',
        };
  
        axios
          .post(baseURL + `/delete/${oproject._id}`, {
            headers,
            body: oproject,
          })
          .then((res) => {
            assert.equal(res.statusCode, 401);
            done();
          })
          .catch((error) => done(error));
      });
    });
  
    describe('GET OProject /:id', () => {
      beforeEach((done) => {
        const data = {
          title: 'Test Project',
          description: 'A test open project',
          highlights: [],
          tags: [],
          skills: [],
          desirables: [],
        };
        const oproject = new OProject({ ...data });
        oproject.save().then(() => console.log("Project saved"));
        done();
      });
  
      it('Status 200', (done) => {
        const userToken = '01'; // TODO: Get user token or set a test user token
        let headers = {
          'content-type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        };
  
        axios
          .get(baseURL + `/${oproject._id}`, {
            headers,
          })
          .then((res) => {
            assert.equal(res.statusCode, 200);
            done();
          })
          .catch((error) => done(error));
      });
  
      it('Status 401', function () {
        let headers = {
          'content-type': 'application/json',
        };
  
        axios
          .get(baseURL + `/${oproject._id}`, {
            headers,
          })
          .then((res) => {
            assert.equal(res.statusCode, 401);
            done();
          })
          .catch((error) => done(error));
      });

});

