const connection = require("./connection-wrapper");

async function addUser(userDetails) {
    let sql = "INSERT INTO users (id, user_name, first_name, last_name, password, city, street, is_admin) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
    let parameters = [userDetails.id, userDetails.userName, userDetails.firstName, userDetails.lastName, userDetails.password, userDetails.city, userDetails.street, userDetails.isAdmin];
    await connection.executeWithParameters(sql, parameters);
}

async function logIn(user){
    let sql = `SELECT id as userId, first_name as firstName, last_name as lastName,
     city, street FROM users WHERE user_name = ? AND password = ? ;`;    
    let parameters = [user.userName, user.password];
    let [userData] = await connection.executeWithParameters(sql, parameters);
    if (!userData){
        return null;
    }
    return userData;
}

async function isUserExist(id, userName){
    let sql = "SELECT id FROM users where id = ? or user_name = ?";
    let parameters = [id, userName];
    let user = await connection.executeWithParameters(sql, parameters);
    if(user && user.length > 0 ){
        return true;
    }
    return false;
}

module.exports = {
    addUser,
    logIn,
    isUserExist
}