const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/products');
const uploadPath = path.join('public', Product.prodpic);
const Category = require('../models/categories');
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif'];

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback)=>{
  }
});

//All product route
router.get('/', async (req , res) =>{
   res.send('All products')

});

//New Product Route

router.get('/new', async (req , res) =>{
    renderNewPage(res, new Product())
  
   });

//Creating Product Route

router.post('/', upload.single('pic'), async (req , res) =>{
    const fileName = req.file != null ? req.file.filename : null;
    const product = new Product({
        name: req.body.name,
        category: req.body.category,
        addedondate: new Date(req.body.addedondate),
        price: req.body.price,
        productpicture : fileName,
        description: req.body.description
    })
    try{
         const newProduct = await product.save()
        // res.redirect('products/$(newProduct.id)')
         res.redirect('products')
    }
    catch{
        renderNewPage(res, book, true)
    }
    
    
   });

   async function renderNewPage(res, product, hasError = false)
   {
    try{
        const categories = await Category.find({})
        const params = {
            categories: categories,
            product: product
    
        }
        if(hasError) params.errorMessage = 'Error creating product'
        
        res.render('products/new', params )
        }
        catch{
            res.redirect('/products')
        }
   }


module.exports = router;