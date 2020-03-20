const express = require('express');

const router = express.Router();
const Category = require('../models/categories');


router.get('/', async (req , res) =>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try{
        const categories = await Category.find(searchOptions)
        res.render('categories/index', 
        {
        categories: categories,
        searchOptions: req.query
        });
    }
    catch{
        res.redirect('/');
    }

});

//New Category Route

router.get('/new', (req , res) =>{
    res.render('categories/new', {
        category: new Category()
    });
   });

//Creating Category Route

router.post('/', async(req , res) =>{
    const category = new Category({
        name: req.body.name
    });
    try{
        const newCategory = await category.save();
        res.redirect('categories');
    }
    catch{
        res.render('categories/new', {
            category:category,
            errorMessage:'Error creating Category'
            
        })
    }
    
   });


module.exports = router;