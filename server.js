if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
const catRouter = require('./routes/categories');
const productRouter = require('./routes/products');

const expressLayouts = require("express-ejs-layouts");

const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: "10 mb", extended: false}));



const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL,
    {useNewUrlParser: true, useUnifiedTopology: true});

    const db = mongoose.connection;

    db.on('error', error => console.error(error));

    db.once('open', () => console.log('Connected to Database'));

    app.use('/', indexRouter);
    app.use('/categories', catRouter);
    app.use('/products', productRouter);
    
    



app.listen(process.env.PORT || 3000 );

