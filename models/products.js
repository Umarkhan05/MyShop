const mongoose = require('mongoose');
const prodpic = 'uploads/productPics'

const bookSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    price: {
        type: Number,
        required: true
    },
    addedondate:{
        type: Date,
        required: true,
        default: Date.now
    },
    productpicture:{
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    }
});


module.exports = mongoose.model("Book", bookSchema);
module.exports.prodpic = prodpic;