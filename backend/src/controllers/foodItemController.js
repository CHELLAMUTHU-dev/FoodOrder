//  Import the FoodMenu model
const { FoodMenu, FoodItem } = require("../models/foodItemModel");

// Function to get all menu items
const getMenuItem = async (req, res) => {
  try {
    const foodItems = await FoodMenu.find({});
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Function to create a new food menu
const createFoodMenu = async (req, res) => {
  const { menu_name, menu_image } = req.body;

  if (!menu_name || !menu_image) {
    return res.status(400).json("Menu name and image are required");
  }

  if (menu_image && !menu_image.startsWith("http")) {
    return res
      .status(400)
      .json("Menu image URL must start with http:// or https://");
  }

  try {
    const newFoodItem = new FoodMenu({ menu_name, menu_image });
    await newFoodItem.save();
    res.status(201).json(newFoodItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Function to get all new food item

const getFoodItem = async (req, res) => {
  const { category } = req.query;
  try {
    if (category === "All") {
      const foodItems = await FoodItem.find({});
      return res.status(200).json(foodItems);
    }
    const foodItems = await FoodItem.find({ category });
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Function to create a new food item
const createFoodItem = async (req, res) => {
  const { name, image, price, description, category } = req.body;
  // Validate the input
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json("Price must be a positive number");
  }

  try {
    const existFood = await FoodItem.find({ name: name });
    console.log(existFood);
    if (existFood.length > 0) {
      return res.status(403).json("Food Item Already in Menu");
    }
    const newFoodItem = new FoodItem({
      name,
      image,
      price,
      description,
      category,
    });
    await newFoodItem.save();
    res.status(201).json("Successfully added");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

// Function to update an existing food item
const updateFoodItem = async (req, res) => {
  try {
    const updatedFoodItem = await FoodItem.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );
    if (!updatedFoodItem) {
      return res.status(404).json("Food item not found");
    }
    res.status(200).json("Food item updated successfully");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

//Function to delete an existing food item
const deleteFoodItem = async (req, res) => {
  try {
    const deletedFoodItem = await FoodItem.findByIdAndDelete(req.body.id);
    if (!deletedFoodItem) {
      return res.status(404).json("Food item not found");
    }
    res.status(200).json("Food item deleted successfully");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

module.exports = {
  getMenuItem,
  createFoodMenu,
  getFoodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
};
