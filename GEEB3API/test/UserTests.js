const User = require('../models/user');
const app = require('../app');
const assert = require('assert');
const mongoose = require('mongoose');
const baseURL = 'http://localhost:3010/users';
const axios = require('axios').default;
// import axios from "axios";

describe('User testing', () => {

    // describe('/POST user /users/register', () => {
    //     it('should create a new user and return a status 200', (done) => {
    //         let headers = {
    //             'Content-Type': 'application/json',
    //         };
    //         const newUser = '{"username": "ArquiTestUser", "email": "test@Arqui.com", "password": "testPassword"}';
    //         axios.post({
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
    //         axios.put({
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
    //         axios.get(baseURL + '/users/mail-query/' + username, (error, response, body) => {
    //             if(error) console.log("Error in get email from username", error);
    //             assert.equal(response.statusCode, 200);
    //             done();
    //         }) 
    //     });
    // });

    // describe('/GET user /users/delete/:id', function () {
    //     it('should delete the new user created and return a status 200', function () {
    //         let email = 'test@Arqui.com';
    //         axios.get(baseURL + '/delete/' + email, (error, response, body) => {
    //             if(error) console.log("Error in delete user", error);
    //             assert.equal(response.statusCode, 200);
    //             console.log(JSON.parse(body));
    //             done();
    //         })
    //     });
    // });

    describe('GET All users /', function(){
        beforeEach((done) => {
          const data1 = {
            username: 'ArquiTestUser1',
            email: 'arqui1@test'
          };
          const data2 = {
            username: 'ArquiTestUser2',
            email: 'arqui2@test'
          }
          const user1 = new User({ ...data1 });
          const user2 = new User({ ...data2 });
          user1.save().then(() => { user2.save().then(() => console.log('Users saved')) });
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
              assert.equal(JSON.parse(res.data).length, 2);
              assert.equal(res.status, 200);
            })
            .catch((error) => console.log(error));
            done();
        });
  
      })

    
      describe('POST users /by-username', function(){
        beforeEach((done) => {
          const data = {
            username: 'ArquiTestUser',
            email: 'arqui@test'
          };
          const user = new User({ ...data });
          user.save();
          done();
        });
    
        it('Status 200', (done) => {
          const userToken = '01'; // TODO: Get user token or set a test user token

    
          axios
            .post(baseURL + '/by-username' ,  {username: 'ArquiTestUser'}
            )
            .then((res) => {
              assert.equal(res.data.email, 'arqui@test');
              assert.equal(res.status, 200);
            })
            .catch((error) => console.log(error));
            done();
        });
        it('Status 400', (done) => {
            const userToken = '01'; // TODO: Get user token or set a test user token

      
            axios
              .post(baseURL + '/by-username' )
              .then((res) => {
                assert.equal(res.status, 400);
              })
              .catch((error) => console.log(error));
              done();
          });
  
      })

    describe('POST users /by-email', function(){
        beforeEach((done) => {
          const data = {
            username: 'ArquiTestUser',
            email: 'arqui@test'
          };
          const user = new User({ ...data });
          user.save();
          done();
        });
    
        it('Status 200', (done) => {
          const userToken = '01'; // TODO: Get user token or set a test user token

    
          axios
            .post(baseURL + '/by-email' , 
            {email: 'arqui@test'}
            )
            .then((res) => {
              assert.equal(res.data.username, 'ArquiTestUser');
              assert.equal(res.status, 200);
            })
            .catch((error) => console.log(error));
            done();
        });
        it('Status 400', (done) => {

            axios
              .post(baseURL + '/by-email' )
              .then((res) => {
                assert.equal(res.status, 400);
              })
              .catch((error) => console.log(error));
              done();
          });
          it('Status 404', (done) => {
      
            axios
              .post(baseURL + '/by-email' , 
                {email: 'arki@test'}
              )
              .then((res) => {
                assert.equal(res.status, 404);
              })
              .catch((error) => console.log(error));
              done();
          });
  
      })

    describe('POST users /register', function () {
        it('should create a new user and return a status different from 500 (error)', async function () {
          const newUser = new User({
            username: 'testUser',
            email: 'test@Arq.com',
            password: 'testPassword',
          });
            const userRegisered = await axios.post(
              baseURL + '/register',
              newUser,
            );
            // get the auth-token created by the backend
            assert.notEqual(userRegisered.status, 500);

        });
      });
      

      describe('PUT users /update', function () {
        beforeEach((done) => {
            const data = {
              username: 'ArquiTestUser',
              email: 'arqui@test'
            };
            const user = new User({ ...data });
            user.save();
            done();
          });
        it('should update the new user created', async function () {
            axios.post(baseURL + '/by-email' , {
                email: 'arqui@test'}) .then((res) => {
                    const userUpdated = axios.put(
                    baseURL + '/update' +
                        '/' +
                        res.data._id /* get the userId generated with the user created*/,
                    );
                    assert.notEqual(userUpdated.status, 500);
               });
        });
      });
      
      describe('GET users / mail-query/:username', function () {
        beforeEach((done) => {
            const data = {
              username: 'ArquiTestUser',
              email: 'arqui@test'
            };
            const user = new User({ ...data });
            user.save();
            done();
        });
        it('should get the email from the username', async function () {

            const email = axios.get(
              baseURL + '/mail-query/ArquiTestUser'
                 /* get the userName generated with the user created*/,
            ).then((res) => {
                assert.equal(res.data.email, 'arqui@test');
            });

        });
      });

});
