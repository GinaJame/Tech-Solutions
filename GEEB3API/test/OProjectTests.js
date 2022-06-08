var assert = require('assert');
const User = require('../models/user');
const OProject = require('../models/oproject');
const axios = require('axios').default;

const base_url = 'http://localhost:3010/oprojects';

describe.only('Open-Project', () => {
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
});
