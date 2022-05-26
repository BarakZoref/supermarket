const usersDal = require("../dal/users-dal");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const validator = require('validator');



async function addUser(userRegistrationData) {
    
    validateUserData(userRegistrationData);
    if (await usersDal.isUserExist(userRegistrationData.id, userRegistrationData.userName)) {
        throw new Error("User already exist");
    }

    userRegistrationData.password = encryptPassword(userRegistrationData.password);
    console.log(userRegistrationData);
    await usersDal.addUser(userRegistrationData);    
}

async function logIn(userLogInData){

    userLogInData.password = encryptPassword(userLogInData.password);
    let userData = await usersDal.logIn(userLogInData);
    if (!userData){
        throw new Error("Login failed");
    }

    const token = jwt.sign({ userId: userData.userId, isAdmin:userData.role}, config.secret);
    let successfulLoginResponse = {token, firstName: userData.firstName, lastName: userData.lastName, city: userData.city, street: userData.street};
    return successfulLoginResponse;
    
}


function validateUserData(userRegistrationData) {

    let reg =  /[^0-9]/g;

    if(userRegistrationData.id.length!=9 || reg.test(userRegistrationData.id)){
        throw new Error("id is invalid");
    }

    if (!validator.isEmail(userRegistrationData.userName)) {
        throw new Error("user name is invalid");
    }

    if (!userRegistrationData.password) {
        throw new Error("Invalid password");
    }
   
    if (userRegistrationData.password.length < 6) {
        throw new Error("Password is too short");
    }

    if(!userRegistrationData.firstName){
        throw new Error("first name field can't be empty");
    }

    if(!userRegistrationData.lastName){
        throw new Error("last name field can't be empty");
    }
    
    if(userRegistrationData.firstName.length>12){
        throw new Error("first name is too long");
    }

    if(userRegistrationData.lastName.length>12){
        throw new Error("last name is too long");
    }

}

function encryptPassword(password) {
    const saltRight = "sdkjfhdskajh";
    const saltLeft = "--mnlcfs;@!$ ";
    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash("md5").update(passwordWithSalt).digest("hex");
}
  


module.exports = {
    addUser,
    logIn
}