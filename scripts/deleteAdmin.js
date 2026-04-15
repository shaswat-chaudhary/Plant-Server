const mongoose = require('mongoose');
const Users = require("../models/userModel");

require('dotenv').config({ 
    path: require('path').resolve(__dirname, '../.env')
 });

const deleteAdmin = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const deleted = await Users.deleteOne({ role: 'admin' });
        if (deleted.deletedCount > 0) {
            console.log("Admin user deleted successfully.");
        } else {
            console.log("No admin user found.");
        }
        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

deleteAdmin();
