const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fbid: { type: String },
    ggid: { type: String },
    username: { type: String },
    email: { type: String },
    name: { type: String },
    phone: { type: String },
    password: { type: String },
    image: { type: String }
})

module.exports = mongoose.model('Users', userSchema);