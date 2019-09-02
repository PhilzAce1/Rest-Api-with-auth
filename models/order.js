const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required },
    quantity: { type: Number, default: 1 },
    productImage: { type: String }
})

module.exports = mongoose.model('Order', orderSchema);