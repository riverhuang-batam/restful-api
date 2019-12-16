const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //_id: mongoose.Types.ObjectId, this cannot be use if the node is old
    product: { type:mongoose.Schema.Types.ObjectId, ref : 'Product', required:true}, //connect to the other schema
    quantity: {type: Number, default:1}
})

module.exports = mongoose.model('Order', orderSchema)