const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email, photo, password, pas confirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  //Only runs this function if the password was actually modified
  if (!this.isModified('password')) return next();
  // encrypting password
  this.password = await bcrypt.hash(this.password, 12);
  //Deleting the passwordConfirm field so it's not saved in the db, it's a required input not necessary for the db
  this.passwordConfirm = undefined;
  //Calls the next middleware
  next();
});
const User = mongoose.model('User', userSchema);
