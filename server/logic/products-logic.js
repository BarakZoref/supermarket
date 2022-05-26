const productsDal = require('../dal/products-dal');

async function getAllProducts(){
    let allProducts = await productsDal.getAllProducts();
    return allProducts;
}

module.exports = {
    getAllProducts
}