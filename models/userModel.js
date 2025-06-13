const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
   
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    opt: {
        type: String,
        require: true,
    },
    optExpire: {
        type: Date,
        require: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
})



//hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}



module.exports = mongoose.model('Users', userSchema);