const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/Product');

const { orders_get_all } = require('../controllers/orders')

router.get('/', orders_get_all)
router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "product not found "
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId,
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save();

        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Order Stored",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "https://localhost:3000/orders/" + result._id
                }
            })
        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            }
        )

})
router.get('/:orderId', (req, res, next) => {
    Order.findById(req.body.params.orderId)
        .populate('product')
        .exec()
        .then(
            order => {
                if (!order) {
                    return res.status(404).json({
                        message: "Order doesnot work "
                    })
                }
                res.status(200).json({
                    order: order,
                    request: {
                        type: "GET",
                        url: "localhost3000"
                    }
                })
            }
        )
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
router.delete('/:orderId', (req, res, next) => {
    Order.remove({ _id: req.params.order.Id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Order was Delete',
                request: {
                    type: "POST",
                    url: "laocaadfagfd",
                    body: { productId: 'ID', quantity: ' Number' }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

module.exports = router;