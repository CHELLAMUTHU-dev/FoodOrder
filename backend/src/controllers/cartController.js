const userModel = require('../models/userModel')



//add to cart
const addToCart = async(req,res) => {
    
    try {
        let userData = await userModel.findById(req.userId.id);
        let cartData = userData.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId.id, { cartData });
        res.status(201).json("Added To cart");
    } catch (error) {
        res.status(500).json("Error0");
    }
}


// remove item from cart

const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.userId.id)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.userId.id , {cartData})
        res.status(201).json("Removed From Cart")
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


//get user Cart data

const getCart = async(req,res) => {
    try {
        let userData = await userModel.findById(req.userId.id)
        let cartData =  await userData.cartData || 0
        res.status(201).json({cartData})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports = {addToCart,getCart,removeFromCart}