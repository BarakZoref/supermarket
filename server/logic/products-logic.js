const productsDal = require('../dal/products-dal');

async function getAmountOfProducts(){
    let amountOfProducts = await productsDal.getAmountOfProducts();
    return amountOfProducts;
}

async function getAllProducts(){
    let allProducts = await productsDal.getAllProducts();
    return allProducts;
}

async function getProductsByCategoryId(categoryId){
    let products = await productsDal.getProductsByCategoryId(categoryId);
    return products;
}

async function editProduct(productDetails){

    if(productDetails.name.length > 30){
        throw new Error("The name length can't be larger than 30");
    }
    if(productDetails.price>200){
        throw new Error("The price can't be larger than 200");
    }
    if(productDetails.imgUrl.length > 100){
        throw new Error("The img url length can't be larger than 100");
    }
    await productsDal.editProduct(productDetails);
}

async function addProduct(productDetails){
    if(productDetails.name.length > 30){
        throw new Error("The name length can't be larger than 30");
    }
    if(productDetails.price>200){
        throw new Error("The price can't be larger than 200");
    }
    if(productDetails.imgUrl.length > 100){
        throw new Error("The img url length can't be larger than 100");
    }
    await productsDal.addProduct(productDetails);
}

module.exports = {
    getAmountOfProducts,
    getAllProducts,
    getProductsByCategoryId,
    editProduct,
    addProduct
}