const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoute = require('./routes/products');
const orderRoute = require('./routes/orders'); 
const userRoute = require('./routes/user')

mongoose.connect("mongodb+srv://Philzace:chukky162@cluster0-aik1x.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true })
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log(err))
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
        'Origin,X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH,GET')
        return res.status(200).json({})
    }
    next()
})
//ROUTER MIDDLEWARES
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/users', userRoute);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

})
module.exports = app;
