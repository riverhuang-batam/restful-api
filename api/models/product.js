const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //_id: mongoose.Types.ObjectId, this cannot be use if the node is old
    name: String,
    price: Number
})

module.exports = mongoose.model('Product', productSchema)