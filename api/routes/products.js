const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:'handling GET request to /products'
    });
});
router.post('/',(req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message:' Handling POST request to /products',
        createdProduct: product
    })
});
router.get('/:productId',(req,res,next)=>{
    
        const id = req.params.productId;
        if (id === 'special'){
            res.status(200).json({
                message:'you know the special id good job',
                id: id
            });
        }else{
            res.status(200).json({
                message:'you passed some ID'
            });
        }
    
});
router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'update product'
    })
})
router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'delete product'
    })
})
module.exports = router;
