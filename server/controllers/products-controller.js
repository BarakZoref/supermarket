const productsLogic = require('../logic/products-logic');
const express = require("express");
const router = express.Router();

//GET ALL PRODUCTS
//GET http://localhost:3000/products
router.get('/', async (request, response) =>{
    try {
        let allProducts = await productsLogic.getAllProducts();
        response.json(allProducts);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;
