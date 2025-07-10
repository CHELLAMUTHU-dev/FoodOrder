const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = async () => {
    try {
        const  connect = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to MongoDB:', connect.connection.host);
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
        
    }
}

module.exports = dbConnect;