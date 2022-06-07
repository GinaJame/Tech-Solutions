var assert = require('assert');
const User = require('../models/user');
import axios from "axios";

describe('Register', function () {
    it('should create a new user and return a status different from 500 (error)', async function () {
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


describe('Delete', function () {
    it('should delete the new user created', async function () {
        try{
            const userDeleted = axios.get("http://localhost:3010/users/delete" + "/" + userId /* get the userId generated with the user created*/);
            console.log("User deleted: ", userDeleted);
            assert.notEqual(userDeleted.status, 500);
        }catch (e){
            console.log(e);
        }
    });
});


describe('Update', function () {
    it('should update the new user created', async function () {
        try{
            const userUpdated = axios.put("http://localhost:3010/users/update" + "/" + userId /* get the userId generated with the user created*/);
            console.log("User updated: ", userUpdated);
            assert.notEqual(userUpdated.status, 500);
        }catch (e){
            console.log(e);
        }
    });
});

describe('getEmailFromUsername', function () {
    it('should get the email from the username', async function () {
        try{
            const email = axios.get("http://localhost:3010/users/mail-query" + userName /* get the userName generated with the user created*/);
            console.log("Email: ", email);
            assert.notEqual(email.status, 500);
        }catch (e){ 
            console.log(e);
        }
    });
});
