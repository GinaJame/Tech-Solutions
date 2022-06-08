var assert = require('assert');
const User = require('../models/user');
const SProject = require('../models/sproject');
const sproject = require('../models/sproject');
const axios = require('axios').default;

const base_url = 'http://localhost:3010/sprojects';

describe.only('Show-Project', () => {
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
        .post(base_url + '/create', {
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
      const sproject = {
        title: 'Test Project',
        description: 'A test project',
        links: [],
        tags: [],
        imageurls: [],
      };

      axios
        .post(base_url + '/create', {
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
      sproject.save().then(() => done());
      done();
    });

    it('Status 200', (done) => {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      axios
        .post(base_url + `/delete/${sproject._id}`, {
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
        .post(base_url + `/delete/${sproject._id}`, {
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
      done();
    });

    it('Status 200', (done) => {
      const userToken = '01'; // TODO: Get user token or set a test user token
      let headers = {
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      };

      axios
        .get(base_url + `/${sproject._id}`, {
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
        .get(base_url + `/${sproject._id}`, {
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
