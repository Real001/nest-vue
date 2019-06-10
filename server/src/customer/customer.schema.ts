import { Schema } from 'mongoose';

export const CustomerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    group: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});