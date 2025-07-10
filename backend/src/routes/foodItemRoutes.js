const express = require('express');
const router = express.Router();
const {getMenuItem,createFoodMenu,getFoodItem,createFoodItem,updateFoodItem,deleteFoodItem} = require('../controllers/foodItemController');

//Route to get all menu items
router.get('/menu',getMenuItem );

//  Route to create a new food item
router.post('/new/feed',createFoodMenu);


// Route to update an existing food item
// router.put('/update/feed/:_id', updateFoodItem);

// Route to delete a food item
// router.delete('/delete/feed/:_id', deleteFoodItem);


router.get('/food', getFoodItem);


router.post('/food/upload',createFoodItem) 




router.post('/update/food', updateFoodItem);
router.post('/delete/food/', deleteFoodItem);

module.exports = router;