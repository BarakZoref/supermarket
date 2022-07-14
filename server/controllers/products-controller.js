const productsLogic = require('../logic/products-logic');
const express = require("express");
const router = express.Router();

//GET AMOUNT OF PRODUCTS
//GET http://localhost:4200/products/amount_of_products
router.get('/amount_of_products', async (request, response) =>{
    try {
        let amountOfProducts = await productsLogic.getAmountOfProducts();
        response.json(amountOfProducts);
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

//GET ALL PRODUCTS
//GET http://localhost:4200/products
router.get('/', async (request, response) =>{
    try {
        let allProducts = await productsLogic.getAllProducts();
        response.json(allProducts);
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

//GET PRODUCTS BY CATEGORY
//GET http://localhost:4200/products/categoryId
router.get('/:categoryId', async (request, response) =>{
    let categoryId = request.params.categoryId;
    try {
        let products = await productsLogic.getProductsByCategoryId(categoryId);
        response.json(products);
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

//ADD PRODUCT
//PUT http://localhost:4200/products
router.post('/', async (request, response) =>{
    let productDetails = request.body;
    try {
        await productsLogic.addProduct(productDetails);
        response.json({err: false, msg: "product was added successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

//EDIT PRODUCT
//PUT http://localhost:4200/products
router.put('/', async (request, response) =>{
    let productDetails = request.body;
    try {
        await productsLogic.editProduct(productDetails);
        response.json({err: false, msg: "product was edited successfuly"});
    } catch (e) {
        console.error(e);
        response.status(600).send({err: true, msg: e.message});
    }
});

module.exports = router;
