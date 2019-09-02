const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        Unique: true,
    },
    password: { type: String, required: true }
})

module.exports = mongoose.model('Order', userSchema);
//you can also set regex using match in the user model to check if what the user is sending is an email