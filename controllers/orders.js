const Order = require('../models/order');
exports.orders_get_all=(req, res, next) => {
    Order.find()
        .populate('product', 'name')
        .exec().select('product quantity _id')
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc.id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/' + doc._id
                        }
                    }
                }),

            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

}