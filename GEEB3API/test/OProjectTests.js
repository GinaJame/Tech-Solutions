var assert = require('assert');
const User = require("../models/user");
import axios from "axios";

describe('get all O-projects of a new user with new oprojects', function () {
    describe('create a new User', function () {
      it('should create a new user to add to it new OProjects', async function () {
          const newUser = new User({
                username: "testUser",
                email: "test@Arq.com",
                password: "testPassword",
          })
          try{
              const userRegisered = await axios.post("http://localhost:3010" + "/users/register", newUser);
              console.log("Registered: ", userRegisered);
              // get the auth-token created by the backend
              assert.notEqual(userRegisered.status, 500);
          }catch (e){
              console.log(e);
          }
      });
    });
    describe('create new oprojects', function () {
        it('should create new oprojects into the new user', async function () {
            const Project = {
                title: "Test OProject",
                description: "Test OProject Description",
                status: "Open",
                tags: [],
                highlights: [],
                desirables: [],
                skills: [],
            };
            try{
                const newOProject = await axios.post("http://localhost:3010/oprojects/create", Project, { headers: {"auth-token": authToken /* get the auth-token generated with the user created*/,} });
                console.log("New OProject: ", newOProject);
                assert.notEqual(newOProject.status, 500);
            }catch (e){
                console.log(e);
            }
        });
    });
    describe('get oprojects by user', function () {
        it('should get all the oprojects linked to the new user created', async function () {
            try{
                const oProjects = await axios.get("http://localhost:3010/oprojects/by" + "/" + userId /* get the userId generated with the user created*/);
                console.log("OProjects: ", oProjects);
                assert.notEqual(oProjects.status, 500);
            }catch (e){
                console.log(e);
            }
        });
    });
    describe('delete user', function () {
        it('should delete the new user created', function () {
            try{
                const userDeleted = axios.get("http://localhost:3010/users/delete" + "/" + userId /* get the userId generated with the user created*/);
                console.log("User deleted: ", userDeleted);
                assert.notEqual(userDeleted.status, 500);
            }catch (e){
                console.log(e);
            }
        });
    });
})