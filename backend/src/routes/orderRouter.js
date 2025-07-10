const express = require('express')
const authMiddleware = require('../middleware/auth')
const {placeOrder,verifyPayment,VerifyOrder,userOrder,listOrders,updateStatus} = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/place', authMiddleware , placeOrder)
orderRouter.post('/verify' , verifyPayment)
orderRouter.post('/confirm/order', authMiddleware , VerifyOrder)
orderRouter.get('/user/orders', authMiddleware , userOrder)
orderRouter.get('/admin/order' , listOrders)
orderRouter.post('/status' , updateStatus)



module.exports = orderRouter