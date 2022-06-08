const User = require('../models/user');
const app = require('../app');
const assert = require('assert');
const mongoose = require('mongoose');
const request = require('request');
const baseURL = 'http://localhost:3010/sprojects';
const SProject = require("../models/sproject");
require("dotenv").config(); 
const axios = require('axios').default;


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
    describe('GET SProject /', function(){
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
          const sproject1 = new SProject({ ...data1 });
          const sproject2 = new SProject({ ...data2 });
          sproject1.save();
          sproject2.save();
          done();
        });
    
        it('Status 200', (done) => {
          const userToken = '01'; // TODO: Get user token or set a test user token
          let headers = {
            'content-type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          };
    
          axios
            .get(baseURL)
            .then((res) => {
                console.log("data", res.data.length);
                assert.equal(res.data.length, 2);
                assert.equal(res.status, 200);
            })
            .catch((error) => console.log(error));
            done();
        });
  
      });

    describe('GET sproject /sprojects/:id', () => {
        it('should get a sproject and return a status 200', (done) => {
            const userId = '603dbd54383aca0c1cb5273d'
            request.get(baseURL +"/"+ userId, (error, response, body) => {
                if(error) console.log("Error in get sproject", error);
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
    describe('POST SProject /create', () => {
        it('Status 200', (done) => {
          const userToken = '01'; // TODO: Get user token or set a test user token
          let headers = {
            'content-type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          };
          const sproject = {
            title: 'Test Project',
            description: 'A test project',
            links: [],
            tags: [],
            imageurls: [],
          };
    
          axios
            .post(baseURL + '/create', {
              headers,
              body: sproject,
            })
            .then((res) => {
              assert.equal(res.statusCode, 200);
              console.log("SProject created");
            })
            .catch((error) => done(error));
            done();
        });
    
        it('Status 401', function () {
          let headers = {
            'content-type': 'application/json',
          };
          const sproject = {
            title: 'Test Project',
            description: 'A test project',
            links: [],
            tags: [],
            imageurls: [],
          };
    
          axios
            .post(baseURL + '/create', {
              headers,
              body: sproject,
            })
            .then((res) => {
              assert.equal(res.statusCode, 401);
              done();
            })
            .catch((error) => done(error));
        });
      });
    
      describe('POST SProject /delete/:id', () => {
        beforeEach((done) => {
          const data = {
            title: 'Test Project',
            description: 'A test project',
            links: [],
            tags: [],
            imageurls: [],
          };
          const sproject = new SProject({ ...data });
          sproject.save().then(() =>console.log("Project saved") );
          done();
        });
    
        it('Status 200', (done) => {
          const userToken = '01'; // TODO: Get user token or set a test user token
          let headers = {
            'content-type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          };
    
          axios
            .post(baseURL + `/delete/${sproject._id}`, {
              headers,
              body: sproject,
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
            .post(baseURL + `/delete/${sproject._id}`, {
              headers,
              body: sproject,
            })
            .then((res) => {
              assert.equal(res.statusCode, 401);
              done();
            })
            .catch((error) => done(error));
        });
      });
    
      describe('GET SProject /:id', () => {
        beforeEach((done) => {
          const data = {
            title: 'Test Project',
            description: 'A test project',
            links: [],
            tags: [],
            imageurls: [],
          };
          const sproject = new SProject({ ...data });
          sproject.save().then(() => done());
        });
    
        it('Status 200', (done) => {
          const userToken = '01'; // TODO: Get user token or set a test user token
          let headers = {
            'content-type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          };
    
          axios
            .get(baseURL + `/${sproject._id}`, {
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
            .get(baseURL + `/${sproject._id}`, {
              headers,
            })
            .then((res) => {
              assert.equal(res.statusCode, 401);
              done();
            })
            .catch((error) => done(error));
        });
      });
});

