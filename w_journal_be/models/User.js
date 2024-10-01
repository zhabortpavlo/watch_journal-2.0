const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true }
}, {
  collection: 'registration_user' // Задайте ім'я колекції тут
});

const User = mongoose.model('User', userSchema);

module.exports = User;

