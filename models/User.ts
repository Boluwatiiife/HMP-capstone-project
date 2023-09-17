import mongoose, { Schema, Model, Document } from "mongoose";
const { isEmail } = require('validator');
import bcrypt from "bcrypt";

interface UserInterface extends Document {
    email: String,
    password: string,
    username: string;
}

const userSchema: Schema<UserInterface> = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'minimum password length is 6 charaters']
    },
    username: {
        type: String,
        required: [true, 'please enter your name']
    },
});

// function after doc is saved to database.
userSchema.post('save', function(doc, next){
    console.log('new user was created and saved', doc);
    next();
});

// function before doc is saved to database.
userSchema.pre<UserInterface>('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user.
userSchema.statics.login = async function (email, password){
    const user = await this.findOne({ email: email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;