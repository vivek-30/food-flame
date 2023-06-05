import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import bcrypt from 'bcrypt';

import { UserToken } from '../types/customTypes';
import { IUser, IUserModel } from '../types/interfaces/model.interface';

config();
const jwtSecret = process.env.JWT_SECRET || 'jwt-secret';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'This username is already taken.'],
    required: [true, 'Username is required to signup.']
  },
  email: {
    type: String,
    unique: [true, 'This email is already registered.'],
    required: [true, 'Email is required to signup.']
  },
  password: {
    type: String,
    required: [true, 'Password is required to signup.']
  },
  verified: {
    type: Boolean,
    default: false
  }
});

// Static methods.
userSchema.statics.signup = async function(
  username: string, 
  email: string,
  password: string
): Promise<UserToken> {

  // Check whether a user with given username and email is verified or not.
  const checkUser: IUser = await this.findOne({ username, email });
  if(checkUser && !checkUser.verified) {
    const deletedUser: IUser = await this.findOneAndDelete({ username, email });
    if(!deletedUser) throw('Internal server error, unable to sign up.');
  }

  // Check whether a user is already exist or not with given username and email.
  const isUserExist: IUser = await this.findOne({ username });
  if(isUserExist) {
    throw Error('This username is already taken.');
  }

  const isEmailExist = await this.findOne({ email });
  if(isEmailExist) {
    throw Error('This email is already registered.');
  }
  
  // Hash password using "bcrypt".
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Try to save user to database.
  const user: IUser = await this.create({
    username,
    email,
    password: hashedPassword
  });

  if(!user) {
    throw Error('Internal Error, unable to signup.');
  }

  // Create token using "jsonwebtoken".
  const token = await jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '1h' });
  return { user, token };
}

userSchema.statics.login = async function(email: string, password: string): Promise<UserToken> {
  const user: IUser = await this.findOne({ email });
  if(!user || (user && !user.verified)) {
    throw Error('This email is not registered yet.');
  }

  // Compare given password with stored hashed password.
  const isMatching = await bcrypt.compare(password, user.password);
  if(!isMatching) {
    throw Error('Login failed, incorrect username or password.');
  }

  // Create token using "jsonwebtoken".
  const token = await jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '3d' });
  return { user, token };
}

export default mongoose.model<IUser, IUserModel>('User', userSchema);
