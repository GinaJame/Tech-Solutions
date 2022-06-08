var assert = require('assert');
const User = require('../models/user');
const OProject = require('../models/oproject');
const oproject = require('../models/oproject');
const axios = require('axios').default;

const base_url = 'http://localhost:3010/oprojects';

describe('Open-Project', () => {
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
        .post(base_url + '/create', {
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
      const oproject = {
        title: 'Test Project',
        description: 'A test project',
        highlights: [],
        tags: [],
        skills: [],
        desirables: [],
      };

      axios
        .post(base_url + '/create', {
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
      oproject.save().then(() => done());
      done();
    });

    it('Status 200', (done) => {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      axios
        .post(base_url + `/delete/${oproject._id}`, {
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
        .post(base_url + `/delete/${oproject._id}`, {
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
      oproject.save().then(() => done());
      done();
    });

    it('Status 200', (done) => {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      axios
        .get(base_url + `/${oproject._id}`, {
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
        .get(base_url + `/${oproject._id}`, {
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
