const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new Schema({
  email: {
    type: String,
    required: 'Debes insertar un email',
    match: [EMAIL_PATTERN, 'email no válido'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: 'Debes insertar una contraseña',
    match: [PASSWORD_PATTERN, 'Debe tener al menos 8 caracteres'],
  },
  nickname: {
    type: String,
    unique: false,
    default: "nickname"
  },
  bio: {
    type: String,
    maxlength: 500,
    default: "Escribe algo sobre ti"
  },
  phoneNumber: {
    type: Number,
    default: 00000000
  },
  avatarUrl:{ 
    type: String, 
    default: 'images/default-avatar.png' 
  },
  balance: {
    type: Number,
    default:20
  }
}, {
  timestamps: true
}, );

userSchema.pre('save', function (next) {

  if (this.isModified('password')) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
