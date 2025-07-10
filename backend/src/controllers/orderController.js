const { CurrencyCodes } = require("validator/lib/isISO4217");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { Console } = require("console");


const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.userId.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    const userOrder = await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId.id, { cartData: {} });
    console.log(userOrder._id)

    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
      notes: req.body.items
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({orderId:order.id,amount:order.amount,currency:order.currency,newOrderId:userOrder._id});

  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      res.status(200).json({success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success:false,error: "Invalid payment signature" });
    }
  } catch (err) {
    res.status(500).json({ success:false,error: "Invalid payment signature" });
  }
};

const VerifyOrder = async (req,res) => {
  const {newOrderId,success} = req.body
    try {
      if(success === true){
        await orderModel.findByIdAndUpdate(newOrderId,{payment:true})
        res.status(201).json("Successfully Paid")
      }else{
        await orderModel.findByIdAndDelete(newOrderId)
        res.status(201).json("Not Paid")
      }
    } catch (error) {
        res.status(501).json(error)
    }
}

// to get userOrders
const userOrder = async (req,res) => {
    try {
      const orders = await orderModel.find({userId: req.userId.id})
      res.json({data:orders}).status(201)
    } catch (error) {
      res.json(error).status(500)
    }
}

// to get all orders
const listOrders = async (req,res) => {
    try {
      const orders = await orderModel.find({})
      res.status(201).json({data:orders})
    } catch (error) {
      res.status(501).json(error)
    }
}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
      res.json("Status Updated").status(201)
    } catch (error) {
      res.json(error).status(500)
    }
}

module.exports = { placeOrder,verifyPayment,VerifyOrder,userOrder,listOrders, updateStatus};
