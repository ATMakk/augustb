const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require ('express');
const mongoose = require ('mongoose');
require ('dotenv').config();
const app = express();
const connectDB = require('./database/connectDB.js');

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const userRoutes = require('./routes/user.route');
app.use("/api/v1", userRoutes);

mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.error("Database connection failed:", err);
}) 




// creation of server
let PORT = process.env.PORT
app.listen(PORT, (err) => {
    if (err) {
        console.error("cannot start server:", err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

module.exports=async(req, res)=>{
    await connectDB()

    return app(req, res)
}
