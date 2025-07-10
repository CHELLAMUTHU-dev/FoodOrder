const mongoose = require('mongoose');


const MenuSchema = new mongoose.Schema({
    menu_name: {
        type: String,
        required: true
    },
    menu_image: {
        type: String,
        required: true
    },
},{timestamps: true});

const FoodMenu  = mongoose.model('menu', MenuSchema);

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{timestamps: true});


const FoodItem = mongoose.model('food', FoodSchema);

module.exports = {FoodItem, FoodMenu};
