import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  group: String,
  description: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  hashPassword: String,
  password: String,
});