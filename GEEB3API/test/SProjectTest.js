const User = require('../models/user');
const app = require('../app');
const assert = require('assert');
const mongoose = require('mongoose');
const request = require('request');
const axios = require('axios').default;
const SProject = require('../models/sproject');
const { AssertionError } = require('assert');

const baseURL = 'http://localhost:3010/sprojects';

describe('User testing', () => {
  describe('/POST user /users/register', () => {
    it('should create a new user and return a status 200', (done) => {
      let headers = {
        'Content-Type': 'application/json',
      };
      const newUser =
        '{"username": "ArquiTestUser", "email": "test@Arqui.com", "password": "testPassword"}';
      request.post(
        {
          url: baseURL + '/users/register',
          headers: headers,
          body: newUser,
        },
        (error, response, body) => {
          if (error) console.log('Error in register user', error);
          assert.equal(response.statusCode, 200);
          console.log(JSON.parse(body));
          done();
        },
      );
    });
  });

  describe('/POST sproject /sprojects/create', () => {
    it('should create a new sproject and return a status 200', (done) => {
      let headers = {
        'Content-Type': 'application/json',
      };
      const newSproject =
        '{"title": "ArquiTestSproject", "description": "Test description", "userId": "624734ba40ba680015d0e89a", "links": [], "imageurls": [], "tags": []}';
      request.post(
        {
          url: baseURL + '/sprojects/create',
          headers: headers,
          body: newSproject,
        },
        (error, response, body) => {
          if (error) console.log('Error in create sproject', error);
          assert.equal(response.statusCode, 200);
          console.log(JSON.parse(body));
          done();
        },
      );
    });
  });

  describe('GET SProject /', function () {
    beforeEach((done) => {
      const data1 = {
        title: 'Test Project 1',
        description: 'A test open project',
        highlights: [],
        tags: [],
        skills: [],
        imageurls: [],
      };
      const data2 = {
        title: 'Test Project 2',
        description: 'A test open project',
        highlights: [],
        tags: [],
        skills: [],
        imageurls: [],
      };
      const sproject1 = new SProject({ ...data1 });
      const sproject2 = new SProject({ ...data2 });
      sproject1.save();
      sproject2.save();
      done();
    });

    it('Status 200', (done) => {
      axios
        .get(baseURL)
        .then((res) => {
          assert.equal(res.data.length, 2);
          assert.equal(res.status, 200);
        })
        .catch((error) => done(error));
      done();
    });
  });

  describe('GET sproject /sprojects/:id', () => {
    it('should get a sproject and return a status 200', (done) => {
      const userId = '603dbd54383aca0c1cb5273d';
      request.get(baseURL + '/' + userId, (error, response, body) => {
        if (error) console.log('Error in get sproject', error);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('/GET user /users/delete/:id', function () {
    it('should delete the new user created and return a status 200', function () {
      let email = 'test@Arqui.com';
      request.get(baseURL + '/delete/' + email, (error, response, body) => {
        if (error) console.log('Error in delete user', error);
        assert.equal(response.statusCode, 200);
        console.log(JSON.parse(body));
        done();
      });
    });
  });

  describe('POST SProject /create', function () {
    const data = {
      title: 'Test Project',
      description: 'A test project',
      links: [],
      tags: [],
      imageurls: [],
    };

    it('Status 200', async function () {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      try {
        const res = await axios.post(baseURL + '/create', {
          headers,
          body: data,
        });
        assert.equal(res.status, 200);
      } catch (err) {
        assert.fail(`The request failed with code ${err.response.status}`);
      }
    });

    it('Status 401', async function () {
      let headers = {
        'content-type': 'application/json',
      };
      try {
        const res = await axios.post(baseURL + '/create', {
          headers,
          body: data,
        });
        assert.fail("The request didn't failed");
      } catch (err) {
        assert.equal(err.response.status, 401);
      }
    });
  });

  describe('POST SProject /delete/:id', function () {
    var sproject;
    beforeEach(async function () {
      const data = {
        title: 'Test Project',
        description: 'A test project',
        links: [],
        tags: [],
        imageurls: [],
      };
      sproject = new SProject({ ...data });
      await sproject.save();
    });

    it('Status 200', async function () {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };
      try {
        const res = await axios.post(baseURL + `/delete/${sproject._id}`, {
          headers,
          body: sproject,
        });
        assert.equal(res.status, 200);
      } catch (err) {
        assert.fail(`The request failed with code ${err.response.status}`);
      }
    });
  });

  describe('GET SProject /:id', function () {
    var sproject;

    beforeEach(async function () {
      const data = {
        title: 'Test Project',
        description: 'A test project',
        links: [],
        tags: [],
        imageurls: [],
      };
      sproject = new SProject({ ...data });
      await sproject.save();
    });

    it('Status 200', async function () {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      try {
        const res = await axios.get(baseURL + `/${sproject._id}`, {
          headers,
        });
        assert.equal(res.status, 200);
      } catch (err) {
        assert.fail(`The request failed with code ${err.response.status}`);
      }
    });
  });
});
