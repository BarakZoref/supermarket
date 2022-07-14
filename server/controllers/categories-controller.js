const categoriesLogic = require('../logic/categories-logic');
const express = require("express");
const router = express.Router();

//GET ALL CATEGORIES
//GET http://localhost:4200/categories
router.get("/", async (request, response)=>{
    try{
        let categories = await categoriesLogic.getAllCategories();
         response.json(categories);
     }
     catch(e){
         console.error(e);
         response.status(600).send({err: true, msg: e.message});
        }
})

module.exports = router