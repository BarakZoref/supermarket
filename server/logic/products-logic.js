const productsDal = require('../dal/products-dal');

async function getAllProducts(){
    let allProducts = await productsDal.getAllProducts();
    return allProducts;
}

async function getProductsByCategoryId(categoryId){
    let products = await productsDal.getProductsByCategoryId(categoryId);
    return products;
}

module.exports = {
    getAllProducts,
    getProductsByCategoryId
}