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

//GET PRODUCTS BY CATEGORIES
//GET http://localhost:3000/products/categoryId
router.get('/:categoryId', async (request, response) =>{
    let categoryId = request.params.categoryId;
    try {
        let products = await productsLogic.getProductsByCategoryId(categoryId);
        response.json(products);
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

//EDIT PRODUCT PRICE
//PUT http://localhost:3000/products
router.put('/', async (request, response) =>{
    let productDetails = request.body;
    try {
        await productsLogic.editProductPrice(productDetails);
        response.json({err: false, msg: "product was edited successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;
