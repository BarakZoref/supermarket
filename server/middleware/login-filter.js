const expressJwt = require('express-jwt');
const config = require('../config.json');

// Extracting the text from the secret's JSON
let { secret } = config;

let whiteListUrls = new Set();
whiteListUrls.add('/users/');
whiteListUrls.add('/users/login');
whiteListUrls.add('/users/is_exist');
whiteListUrls.add('/products/amount_of_products');
whiteListUrls.add('/orders/amount_of_orders');
whiteListUrls.add('/categories');
whiteListUrls.add('/doc/');




function authenticateJwtRequestToken() {
    
    return expressJwt({ secret, algorithms: ['sha1', 'RS256', 'HS256'] }).unless(request => {
        // if (request.method == 'POST' && request.url.endsWith('/users')) {
        //     return true;
        // }
       

        // If the url resides in our whitelist urls
        if (whiteListUrls.has(request.url)) {
            return true;
        }

        return false;

    });
}

module.exports = authenticateJwtRequestToken;