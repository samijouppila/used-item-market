const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    birthDate: {
        type: String,
        required: true
    },
    contactInformation: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        phoneNumber: {
            type: String
        }
    }
});

UserSchema.pre('save', function (next) {
    const saltRounds = 10;
    // Check if the password has been modified
    if (this.modifiedPaths().includes('password')) {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
          if (err) return next(err);
          this.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;