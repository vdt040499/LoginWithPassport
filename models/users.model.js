const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fbid: { type: String },
    username: { type: String },
    email: { type: String },
    name: { type: String },
    phone: { type: String },
    password: { type: String }
})

module.exports = mongoose.model('Users', userSchema);