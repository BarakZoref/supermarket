const productsDal = require('../dal/products-dal');

async function getAllProducts(){
    let allProducts = await productsDal.getAllProducts();
    return allProducts;
}

async function getProductsByCategoryId(categoryId){
    let products = await productsDal.getProductsByCategoryId(categoryId);
    return products;
}

async function editProductPrice(productDetails){
    if(productDetails.price>200){
        throw new Error("The price can't be larger than 200");
    }
    await productsDal.editProductPrice(productDetails);
}

module.exports = {
    getAllProducts,
    getProductsByCategoryId,
    editProductPrice
}