const tokenDecoder = require("../utils/token-decoder");
const usersLogic = require("../logic/users-logic")
const express = require("express");
const router = express.Router();

// ADD USER
// POST http://localhost:4200/users
    router.post("/", async (request, response) => {

        let userRegistrationData = request.body;
        userRegistrationData.role = "user";
        try {
            await usersLogic.addUser(userRegistrationData);
            response.json({err: false, msg: "user was added successfuly!"});
        }
        catch (e) {
            console.error(e);
            response.status(600).send(e.message);        
        }
    });

    // LOG IN
    // POST http://localhost:4200/users/login
    router.post("/login", async (request, response) => { 
        let userLogInData = request.body;
        try{
           let successfulLoginResponse = await usersLogic.logIn(userLogInData);
    
            response.json(successfulLoginResponse);
        }
        catch(e){
            console.error(e);
            response.status(600).send(e.message);
        }
    });

    // IS USER EXIST
    // POST http://localhost:4200/users/is_exist
    router.post("/is_exist", async (request, response) => { 
        let userData = request.body;
        try{
           let isExists = await usersLogic.isUserExist(userData);
    
            response.json(isExists);
        }
        catch(e){
            console.error(e);
            response.status(600).send(e.message);
        }
    });




module.exports = router;

