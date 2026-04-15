const mongoose = require('mongoose');
const Users = require("../models/userModel");
require('dotenv').config({ 
     path: require('path').resolve(__dirname, '../.env')
 });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const existAdmin = await Users.findOne({ role: 'admin' });
        if (existAdmin) {
            console.log("Admin already");
            process.exit();
        }
        await Users.create({
            name: "Shaswat Kumar Chaudhary",
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: "admin",
            isActive: true,
        });
        console.log("admin create Successfully");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedAdmin();