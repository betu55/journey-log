const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const SALT_FACTOR = 12

const UserSchema = new mongoose.Schema({
    username: {
        type:       String,
        unique:     true,
        required:   true,
        lowercase:  true,
        trim:       true
    },
    password: {
        type:       String,
        required:   true,
        trim:       true,
        minlength: 6,
        select: false // Hide password by default
    }
});

// Pre-save hook to encrypt password before saving to mongoDb
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) 
        return;
    
    // Salt generation and hashing
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    
  } catch (error) {
    throw error; 
  }
});

UserSchema.methods.comparePassword = async function(password) {
  try {
    // Compare password and hashed password
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Password Incorrect');
  }
};

const User = mongoose.model('user', UserSchema);
module.exports = User;