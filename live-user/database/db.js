const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

const User = mongoose.model('User', userSchema);

async function getUsers(page, limit) {
    const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
    return users;
}

async function getUserById(id) {
    const user = await User.findById(id).exec();
    return user;
}

module.exports = { getUsers, getUserById };