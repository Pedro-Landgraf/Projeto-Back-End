const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    isAdmin: {type: Boolean, immutable: true}
}) 

module.exports = mongoose.model('User', userSchema);