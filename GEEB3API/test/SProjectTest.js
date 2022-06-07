var assert = require('assert');
const User = require("../models/user");
import axios from "axios";
const Sproject = require("../models/sproject");

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
    describe('create new sprojects', function () {
        it('should create new sprojects into the new user', async function () {
            const SProject = new Sproject({
                title: "Test SProject",
                description: "Test SProject Description",
                userid: userId,
                links: [],
                imageurls: [],
                tags: [],
            });
            try{
                const newSProject = await axios.post("http://localhost:3010/sprojects/create", SProject, { headers: {"auth-token": authToken /* get the auth-token generated with the user created*/,} });
                console.log("New SProject: ", newSProject);
                assert.notEqual(newSProject.status, 500);
            }catch (e){
                console.log(e);
            }
        });
    });
    describe('get sprojects by user', function () {
        it('should get all the sprojects linked to the new user created', async function () {
            try{
                const sProjects = await axios.get("http://localhost:3010/sprojects/" + userId /* get the userId generated with the user created*/);
                console.log("SProjects: ", sProjects);
                assert.notEqual(sProjects.status, 500);
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