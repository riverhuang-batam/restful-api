const mongoose = require('mongoose')
const Product = require('../models/product')
var multer = require('multer');


exports.products_get_all = (req, res, next) => { //see
    Product
        .find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                product: docs.map(doc =>{
                    return{
                        name: doc.name,
                        price: doc.price,
                        productImage:doc.productImage,
                        _id : doc.id,
                        request:{
                            type:"GET",
                            url:'http://localhost:3000/products/'+ doc.id
                        }
                    }
                })
            }
            console.log(response);
            // if(docs.length >= 0){
            res
                .status(200)
                .json(response)
            // }else{     res.status(404).json({         message:"No Entries Found"     }) }
        })
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({error: err});
        })
}
exports.products_create_product = (req, res, next) => { //create
    console.log(req.file)
    const product = new Product({
        _id: new mongoose
            .Types
            .ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res
                .status(201)
                .json({message: 'Created product successfully', 
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request:{
                        type:"GET",
                        url:'http://localhost:3000/products/'+ result.id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err),
            res
                .status(500)
                .json({error: err})

        });

}
exports.products_get_product = (req, res, next) => {
    const id = req.params.productId
    Product
        .findById(id)
        .select("name price _id productImage")
        .exec()
        .then(doc => {
            console.log("From Database", doc);
            if (doc) {
                res
                    .status(200)
                    .json({
                        product: doc,
                    request:{
                        type:'GET',
                        description: "Get all product",
                        url: "http://localhost/products" 
                    }
                    });
            } else {
                res
                    .status(404)
                    .json({message: "no valid entry found for provided ID"})
            }

        })
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({error: err})
        })
        //  if(id === 'special'){ res.status(200).json({         message:'You discovered
        // the special ID',   id : id     }); }else{     res.status(200).json({
        // message: 'You passed an ID'     }); }
}
exports.products_update_product = (req, res, next) => { //update
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({
        _id: id
    }, {$set: updateOps})
    
        .exec()
        .then(
        result => {
            
            res.status(200).json({
                message: 'product Updated',
                request:{
                    type:"GET",
                    url:"http//localhost:3000/products/" + id
                }
            })
        }).catch(
        err =>{
            res.status(500).json({
                error:err
        });
    })
}
exports.products_delete_product = (req, res, next) => { //delete
    const id = req.params.productId;
    Product
        .remove({_id: id})
        .exec()
        .then(result => {
            res
                .status(200)
                .json({
                    message:"product deleted",
                    request:{
                        type:"POST",
                        url:"http//localhost:3000/products/",
                        body:{ name: "string", price: "number"}
                    }
                });
        })
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({error: err})
        });
}