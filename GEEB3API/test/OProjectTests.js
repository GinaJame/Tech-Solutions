const User = require('../models/user');
const app = require('../app');
const assert = require('assert');
const mongoose = require('mongoose');
const request = require('request');
const axios = require('axios').default;
const OProject = require('../models/oproject');

const baseURL = 'http://localhost:3010/oprojects';

describe('OProject testing', () => {
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
          if (error) done(error);
          assert.equal(response.statusCode, 200);
          done();
        },
      );
    });
  });

  describe('/POST oprojects /oprojects/create', () => {
    it('should create a new oproject and return a status 200', (done) => {
      let headers = {
        'Content-Type': 'application/json',
      };
      const newOProject =
        '{"title": "Test OProject", "description": "Test OProject Description", "status": "Open", "tags": [], "highlights": [], "desirables": [], "skills": []}';
      request.post(
        {
          url: baseURL + '/oprojects/create',
          headers: headers,
          body: newOProject,
        },
        (error, response, body) => {
          if (error) done(error);
          assert.equal(response.statusCode, 200);
          done();
        },
      );
    });
  });

  describe('/GET oprojects /oprojects/by/userId', () => {
    it('should get all the oprojects linked to the new user created', (done) => {
      const userId = '624734ba40ba680015d0e89a';
      request.get(baseURL + '/by/' + userId, (error, response, body) => {
        if (error) done(error);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('GET OProject /', function () {
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

  describe('/GET user /users/delete/:id', function () {
    it('should delete the new user created and return a status 200', function () {
      let email = 'test@Arqui.com';
      request.get(baseURL + '/delete/' + email, (error, response, body) => {
        if (error) done(error);
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('POST OProject /create', function () {
    const data = {
      title: 'Test Project',
      description: 'A test project',
      highlights: [],
      tags: [],
      skills: [],
      desirables: [],
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

  describe('POST OProject /delete/:id', function () {
    var oproject;

    beforeEach(async function () {
      const data = {
        title: 'Test Project',
        description: 'A test open project',
        highlights: [],
        tags: [],
        skills: [],
        desirables: [],
      };
      oproject = new OProject({ ...data });
      await oproject.save();
    });

    it('Status 200', async function () {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };
      try {
        const res = await axios.post(baseURL + `/delete/${oproject._id}`, {
          headers,
          body: oproject,
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
        const res = await axios.post(baseURL + `/delete/${oproject._id}`, {
          headers,
          body: oproject,
        });
        assert.fail("The request didn't failed");
      } catch (err) {
        assert.equal(err.response.status, 401);
      }
    });
  });

  describe('GET OProject /:id', function () {
    var oproject;

    beforeEach(async function () {
      const data = {
        title: 'Test Project',
        description: 'A test open project',
        highlights: [],
        tags: [],
        skills: [],
        desirables: [],
      };
      oproject = new OProject({ ...data });
      await oproject.save();
    });

    it('Status 200', async function () {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      try {
        const res = await axios.get(baseURL + `/${oproject._id}`, {
          headers,
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
        const res = await axios.get(baseURL + `/${oproject._id}`, {
          headers,
        });
        assert.fail("The request didn't failed");
      } catch (err) {
        assert.equal(err.response.status, 401);
      }
    });
  });
});
