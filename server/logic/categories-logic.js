const categoriesDal = require('../dal/categories-dal');

async function getAllCategories(){
    const allCategories = await categoriesDal.getAllCategories();
    return allCategories;
}

module.exports = {getAllCategories}

