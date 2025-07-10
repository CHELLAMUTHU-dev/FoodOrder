const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv').config();

// Import routes
const foodItemRoutes = require('./routes/foodItemRoutes');
const userRouter = require('./routes/userRouter');
const cartRouter  = require('./routes/cartRouter')
const orderRouter  = require('./routes/orderRouter')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/restaurant',foodItemRoutes);
app.use("/restaurant/user",userRouter)
app.use('/restaurant/cart',cartRouter)
app.use('/restaurant/order',orderRouter)

try {
    dbConnect(); // Connect to the database
    const PORT = process.env.PORT || 5001; // Use environment variable or default to 5000

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }); 
} catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process with failure
    
}

